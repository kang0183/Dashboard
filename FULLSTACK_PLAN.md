# 풀스택 전환 설계 문서

## 목표

현재 정적 HTML 대시보드를 Express + RDS 기반 풀스택 웹앱으로 전환.
팀원 누구나 웹에서 KPI 데이터를 입력/조회할 수 있도록 한다.

## 현재 구조 (AS-IS)

```
Excel (OneDrive)
  → Python 스크립트 (update_v12.py, update_kpi_v12.py)
  → JSON 캐시
  → index.html (const data / kpiMonthly / kpiDetail 직접 임베드)
  → App Runner (server.js: 정적 파일 서빙)
  → localStorage (실적 입력 임시 저장 — 내 브라우저에만 저장됨)
```

**한계:**
- 데이터 업데이트 = 로컬에서 Python 스크립트 직접 실행 필요
- 실적 입력 데이터가 브라우저 localStorage에만 저장 (팀 공유 불가)
- Excel 없으면 데이터 업데이트 불가

## 목표 구조 (TO-BE)

```
브라우저 (HTML/JS)
  ↕ REST API (fetch)
Express 서버 (App Runner, Node.js 22)
  ↕ mysql2
RDS MySQL (Secrets Manager ARN으로 접속)
```

**달라지는 것:**
- 팀원이 웹에서 입력 → DB 저장 → 모두 실시간 조회 가능
- Python 스크립트 → 과도기에는 Excel → DB 업로드 용도로만 유지
- 최종적으로 자동화율 포함 모든 데이터를 웹에서 관리

## 단계별 전환 계획

### Phase 1 — Express 전환 + 실적 입력 DB 연결 ← 지금 시작

**목표:** 실적 입력(설비개선/인원합리화/글로벌) localStorage → DB 교체

**작업 목록:**
1. `server.js` → Express 앱으로 전환 (정적 파일 서빙은 유지)
2. `db/connection.js` — Secrets Manager ARN으로 RDS 연결
3. `db/schema.sql` — 테이블 생성 스크립트
4. `routes/equip.js` — 설비개선 CRUD API
5. `routes/inwon.js` — 인원합리화 CRUD API
6. `routes/global.js` — 글로벌 생산기술 API
7. `index.html` — KpiStore를 localStorage → fetch API로 교체
8. `package.json` — express, mysql2, @aws-sdk/client-secrets-manager 추가

**자동화율:** 아직 Excel → Python → HTML 임베드 방식 유지

### Phase 2 — KPI 월별 요약 자동 계산

**목표:** DB 데이터로 월간보고서/메인허브 수치 자동 집계

**작업 목록:**
1. `routes/kpi.js` — GET /api/kpi/summary (월별 집계 쿼리)
2. `index.html` — kpiMonthly 하드코딩 → API 호출로 교체
3. 월간보고서 섹션도 API 데이터 기반으로 전환

### Phase 3 — 자동화율 웹 전환 (최종 목표)

**목표:** Excel 완전 제거, 모든 데이터를 웹에서 관리

**작업 목록:**
1. `routes/auto-rate.js` — 공장/라인/공정별 자동화율 CRUD
2. 실적 입력 섹션에 자동화율 탭 추가
3. Python 스크립트 deprecated

---

## DB 스키마 설계

### 설비개선 (equip)
```sql
CREATE TABLE equip (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  year        INT NOT NULL DEFAULT 2026,
  month       INT NOT NULL,           -- 완료월 (1-12)
  투자내용    VARCHAR(200) NOT NULL,
  담당자      VARCHAR(50),
  금액        DECIMAL(10,1),          -- 백만원
  진행상황    VARCHAR(50),
  비고        TEXT,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 인원합리화 (inwon)
```sql
CREATE TABLE inwon (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  투자명  VARCHAR(200) NOT NULL,
  담당자  VARCHAR(50),
  인원    INT,
  비고    TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE inwon_monthly (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  inwon_id  INT NOT NULL,
  year      INT NOT NULL DEFAULT 2026,
  month     INT NOT NULL,
  투자효과  DECIMAL(10,1),   -- 백만원
  가동율    DECIMAL(5,2),    -- %
  FOREIGN KEY (inwon_id) REFERENCES inwon(id) ON DELETE CASCADE,
  UNIQUE KEY uq_inwon_month (inwon_id, year, month)
);
```

### 글로벌 생산기술 (global_exchange)
```sql
CREATE TABLE global_exchange (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  year     INT NOT NULL DEFAULT 2026,
  month    INT NOT NULL,
  country  VARCHAR(50) NOT NULL,   -- 한국/상해/광저우/인니/태국/미국/영페이스/네오
  count    INT DEFAULT 0,
  UNIQUE KEY uq_global (year, month, country)
);
```

### 자동화율 (auto_rate) — Phase 3
```sql
CREATE TABLE auto_rate (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  year        INT NOT NULL,
  month       INT NOT NULL,
  factory     VARCHAR(50) NOT NULL,   -- 화성1공장 등
  auto_count  INT DEFAULT 0,
  total_count INT DEFAULT 0,
  UNIQUE KEY uq_rate (year, month, factory)
);
```

---

## API 엔드포인트 설계

### 설비개선
```
GET    /api/equip?year=2026          전체 조회
POST   /api/equip                    항목 추가
PUT    /api/equip/:id                항목 수정
DELETE /api/equip/:id                항목 삭제
```

### 인원합리화
```
GET    /api/inwon                    전체 조회
POST   /api/inwon                    항목 추가
PUT    /api/inwon/:id                항목 수정
DELETE /api/inwon/:id                항목 삭제
GET    /api/inwon/:id/monthly        월별 효과 조회
POST   /api/inwon/:id/monthly        월별 효과 저장 (upsert)
```

### 글로벌
```
GET    /api/global?year=2026         연도별 조회
POST   /api/global                   저장 (upsert)
```

### KPI 요약 (자동 집계)
```
GET    /api/kpi/summary?year=2026    월별 KPI 집계 (DB 쿼리)
```

---

## 파일 구조 변경

```
v12/deploy/
├── app.js                  ← server.js 대체 (Express)
├── package.json            ← express, mysql2, @aws-sdk/client-secrets-manager 추가
├── apprunner.yaml          ← run.command: node app.js
├── db/
│   ├── connection.js       ← Secrets Manager ARN → RDS 연결
│   └── schema.sql          ← 테이블 생성 스크립트
├── routes/
│   ├── equip.js
│   ├── inwon.js
│   ├── global.js
│   └── kpi.js
└── public/
    ├── index.html          ← 현재 index.html 이동
    ├── data.json
    └── articles.json
```

---

## DB 접속 정보

- **방식:** AWS Secrets Manager ARN → RDS MySQL
- **ARN 형식:** `arn:aws:secretsmanager:ap-northeast-1:559784498787:secret:...`
- **접속 가능 환경:** 회사 네트워크 (VPC Private) 또는 App Runner 내부
- **로컬 개발:** DB 없이 mock 응답으로 개발 → 회사 가서 실 DB 연결 테스트

---

## 과도기 운영 방식

| 항목 | Phase 1 | Phase 2 | Phase 3 |
|------|---------|---------|---------|
| 자동화율 | Excel → Python → HTML | Excel → Python → HTML | 웹 입력 → DB |
| 설비개선 | DB | DB | DB |
| 인원합리화 | DB | DB | DB |
| 글로벌 | DB | DB | DB |
| 월별 KPI 요약 | kpiMonthly 하드코딩 | DB 자동 집계 | DB 자동 집계 |

---

## 다음 컨텍스트에서 시작할 작업 (Phase 1)

1. `v12/deploy/app.js` 작성 (Express, 정적 서빙 + API 라우터)
2. `v12/deploy/db/connection.js` 작성 (Secrets Manager ARN 기반)
3. `v12/deploy/db/schema.sql` 작성
4. `v12/deploy/routes/equip.js` 작성
5. `v12/deploy/routes/inwon.js` 작성
6. `v12/deploy/routes/global.js` 작성
7. `v12/deploy/package.json` 업데이트
8. `v12/deploy/apprunner.yaml` run command 수정
9. `index.html` KpiStore → fetch API 교체
10. GitHub push → App Runner 자동 배포
11. 회사 네트워크에서 DB 연결 테스트
