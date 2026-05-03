# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

COSMAX 생산 자동화 대시보드. 5개 공장(화성1/3/5공장, 평택1/2공장)의 자동화율, KPI 지표, 관련 기사를 추적한다.

**현재 전환 진행 중:** 정적 HTML → Express + RDS 풀스택 구조. 상세 설계는 `FULLSTACK_PLAN.md` 참조.

### 전환 단계 현황
- **Phase 1 (진행 예정):** Express 전환 + 실적 입력(설비개선/인원합리화/글로벌) DB 연결
- **Phase 2 (예정):** KPI 월별 요약 DB 자동 집계
- **Phase 3 (최종):** 자동화율 웹 입력 전환, Excel 완전 제거

### 인프라
- **App Runner:** `arn:aws:apprunner:ap-northeast-1:559784498787:service/AI-automation-Dashboard/914648abecb44fb0a77e89e708a3dda9`
- **도메인:** `ai-automation.cosmaxhub.com` (사내 네트워크 전용, VPC Private)
- **DB:** RDS MySQL (Secrets Manager ARN — 회사 네트워크에서만 접속 가능)
- **Vercel:** `https://deploy-iota-sepia.vercel.app` (개발/확인용, 외부 접근 가능)

## 아키텍처

```
Excel (OneDrive) → Python 스크립트 → JSON 캐시 → Dashboard HTML (임베드 데이터 + 바닐라 JS)
                                                 ↘ deploy/ (정적 파일) → Vercel
```

### 파이프라인 흐름

1. **데이터 수집**: `update_v12.py`가 OneDrive의 Excel 파일(`충포장 공정 자동화율 *.xlsx`)에서 최신 파일을 자동 선택
2. **가공**: `generate_dashboard.py`의 함수들(`_load_master`, `_factory_summary`, `_line_rates` 등)로 공장별/품목별/라인별 자동화율 계산
3. **주입**: HTML 내 `const data = {...}` 블록을 파싱하여 JSON 교체. `_find_data_block()`이 중괄호 깊이를 추적하여 블록 경계 결정
4. **배포**: `prepare_deploy.py`가 HTML에서 `data.json`과 `articles.json`을 추출 → `deploy/` 폴더에 정적 파일 생성 → Vercel로 배포

### 핵심 파일

- **v12/Dashboard_dev.html** — 개발용 대시보드 (~1350줄). `const data = {...}` 블록에 JSON 데이터를 직접 주입. 자동화율, KPI 관리, 로봇 & 최신정보 3개 섹션.
- **v12/Dashboard.html** — 배포용 대시보드. `update_v12.py`의 기본 출력 대상.
- **v12/update_v12.py** — 자동화율 데이터 업데이트. `generate_dashboard`를 `gd`로 임포트하여 사용. `sys.path`에 부모 디렉토리를 추가하는 방식.
- **v12/update_kpi_v12.py** — KPI Excel 소스에서 월별 지표(인원합리화, 설비개선, 글로벌생산기술) 추출.
- **generate_dashboard.py** — 루트의 공통 유틸리티 라이브러리. `update_v12.py`가 `import generate_dashboard as gd`로 임포트. 단독 실행은 레거시.
- **v12/prepare_deploy.py** — `Dashboard_dev.html`에서 `data.json`, `articles.json`을 추출하여 `deploy/` 폴더에 생성.
- **v12/deploy/** — Vercel 배포 대상 폴더. `index.html`, `data.json`, `articles.json`, `vercel.json` 포함.
- **v12/articles.json** — 뉴스 기사 데이터. 로봇 & 최신정보 섹션에서 사용.
- **private/** — 공장 매핑 파일(공장 매핑.txt) 및 민감 데이터. git에서 추적하지 않음.

## 주요 명령어

```bash
# Excel 소스에서 대시보드 데이터 업데이트
python v12/update_v12.py

# KPI 데이터 업데이트
python v12/update_kpi_v12.py

# Vercel 배포 (WSL에서)
bash v12/deploy.sh

# PowerShell 전체 업데이트 (Windows)
powershell -File Update-Dashboard.ps1
```

빌드, 테스트, 린터는 설정되어 있지 않다. 대시보드는 정적 HTML 파일로 브라우저에서 직접 연다.

## 의존성

Python: `pandas`, `openpyxl` (Excel 읽기용). package.json이나 requirements.txt 없음 — `pip install pandas openpyxl`로 수동 설치.

## 핵심 규칙

- **인코딩:** 모든 파일 I/O는 반드시 UTF-8 사용. PowerShell 등에서 기본 인코딩을 쓰면 한글이 깨진다(mojibake). 한글 텍스트 처리는 PowerShell 대신 Python으로 하는 것을 권장.
- **공장 매핑:** 라인→공장 정규화는 `private/공장 매핑.txt`를 사용. 화성2공장은 대시보드에서 명시적으로 제외(`EXCLUDED_FACTORIES`).
- **데이터 캐싱:** `v12_data_cache.json`, `v12_kpi_cache.json`에 타임스탬프와 함께 가공 데이터 저장. 소스 파일의 `mtime`이 변경되지 않으면 업데이트를 건너뜀.
- **데이터 주입 방식:** HTML 내 `const data = {...}` JS 블록을 파싱하여 JSON을 교체. HTML을 수동 편집할 때 이 블록 구조를 깨뜨리지 않도록 주의.
- **CSS 테마:** CSS 커스텀 속성 사용 (`--accent`, `--accent-2`, `--accent-warm`). 폰트: Pretendard → Noto Sans KR → Apple SD Gothic Neo.
- **대시보드 레이아웃:** 2컬럼 그리드 (240px 고정 사이드바 + 반응형 메인). 클라이언트 사이드 바닐라 JS로 렌더링 — 프레임워크 없음.
- **Excel 스키마:** Master Sheet 필수 컬럼: "Line 명", "자동공정(개선전)", "총공정(개선전)". 피벗 시트는 "행 레이블"과 합계 컬럼 사용. Python 스크립트가 로드 시 검증.
- **자동화율 계산:** 자동화율 = (자동공정 / 총공정) × 100. 분모가 0이면 0 처리. 소수점 1자리까지 표시.
- **Excel 소스 경로:** OneDrive 경로가 하드코딩되어 있음 (`C:\Users\jungwoo.kang\COSMAX\...`). 다른 환경에서는 경로 수정 필요.

## Git 설정

`.gitignore`가 기본적으로 모든 파일을 제외(`*`)하고, 특정 파일만 화이트리스트(`!파일명`)로 추적한다. 새 파일을 git에 추가하려면 `.gitignore`에 `!파일명`을 명시해야 한다. v12/ 디렉토리는 별도의 `.gitignore`를 두고 있지 않으며, 루트의 화이트리스트에도 포함되어 있지 않다.
