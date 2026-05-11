# 월별 대시보드 업데이트 체크리스트

매월 초 실행. 순서대로 진행하면 누락 없음.

---

## STEP 1 — Excel 파일 준비 (사람이 할 일)

| 확인 | 항목 | 경로 |
|------|------|------|
| ☐ | 자동화율 Excel 최신 파일 | `COSMAX\...\E. 공정 자동화율\충포장 공정 자동화율 N월.xlsx` |
| ☐ | OKR Excel 업데이트 완료 | `COSMAX\...\7) 2026년\260xxx_OKR_AI자동화팀 진행현황_revX.xlsx` |
| ☐ | OKR Excel: 인원합리화 당월 실적 입력 | `1. 인원합리화 효과분석` 시트 |
| ☐ | OKR Excel: 설비개선 당월 실적 입력 | `2. 설비 개선` 시트 |
| ☐ | OKR Excel: 글로벌 당월 실적 입력 | `3. 글로벌 생산기술 교류` 시트 (없으면 0으로 처리) |

---

## STEP 2 — 스크립트 실행 (WSL에서 한 번에)

```bash
cd /mnt/c/Users/jungwoo.kang/0_dashboard
python3 v12/update_monthly.py
```

이 스크립트가 자동으로 처리하는 것:
- `update_v12.py` → 자동화율 계산, `data.json` 갱신, `monthlyAutoRates` 갱신
- `update_kpi_v12.py` → 인원합리화/설비개선/글로벌 실적, `kpiMonthly`, `kpiDetail` 갱신
- `index.html` const data 블록 → `data.json` 내용으로 교체

---

## STEP 3 — 결과 확인 (눈으로 확인할 것)

| 확인 | 항목 | 예상값 예시 |
|------|------|------|
| ☐ | `data.json` → `overallRate` | 4월 기준 48.6% |
| ☐ | `data.json` → `monthlyAutoRates` | 해당 월 index에 값 있음 |
| ☐ | `index.html` → kpiMonthly actual 4월 | 인원합리화/설비개선/글로벌 값 |
| ☐ | 로컬 브라우저로 index.html 열기 | 자동화율 그래프, 월간 보고서 확인 |

---

## STEP 4 — 배포

```bash
# 변경 파일 커밋
git add v12/deploy/index.html v12/deploy/data.json
git commit -m "Update: N월 데이터 (자동화율 XX.X%, 인원합리화 XXX백만원)"
git push origin main      # → GitHub Actions가 App Runner 자동 배포

# Vercel 배포 (외부 확인용)
bash v12/deploy.sh
```

| 확인 | 배포 대상 | URL |
|------|------|------|
| ☐ | App Runner (사내) | https://ai-automation.cosmaxhub.com |
| ☐ | Vercel (외부 확인용) | https://deploy-iota-sepia.vercel.app |

---

## STEP 5 — 웹에서 최종 확인

| 확인 | 항목 |
|------|------|
| ☐ | 메인 화면 자동화율 숫자 (우상단) |
| ☐ | 월별 자동화율 트렌드 그래프 (당월 막대 추가됨) |
| ☐ | 공장별 자동화율 카드 |
| ☐ | KPI 탭 → 인원합리화 차트 (당월 실적 막대) |
| ☐ | KPI 탭 → 설비개선 차트 |
| ☐ | KPI 탭 → 글로벌 생산기술 차트 |
| ☐ | 월간 보고서 버튼 → `N월 실적` 제목 |
| ☐ | 월간 보고서 → 자동화율 당월/전월 대비/연초 대비 |
| ☐ | 월간 보고서 → 인원합리화 당월 효과 |
| ☐ | 월간 보고서 → 설비개선 당월 완료 건수 |
| ☐ | 실적 입력 탭 → App Runner에서만 접속 가능 (Vercel은 서버 연결 필요 메시지) |

---

## 참고: 데이터 흐름

```
Excel 파일
  │
  ├─ 충포장 자동화율 N월.xlsx
  │     └─ update_v12.py → data.json (overallRate, monthlyAutoRates, factories)
  │
  └─ OKR Excel
        └─ update_kpi_v12.py → index.html (kpiMonthly, kpiDetail)
                                      │
                          update_monthly.py도 sync:
                          index.html const data = {...} ← data.json
```

## 참고: 월별 자동화율 계산 방식

- **개선전 (baseline)**: 4월 파일의 개선전 기준율 → 연초 기준값 (1월 표시용)
- **개선후**: 각 월 파일의 개선후 컬럼 → 해당 월 달성 자동화율
- 단, 이전 월 개선후가 소스 월보다 높으면 (라인 구성 차이) → baseline으로 대체
- `monthlyAutoRates` 배열: index 0=1월, 1=2월, ..., 11=12월

## 자주 발생하는 실수

| 증상 | 원인 | 해결 |
|------|------|------|
| 월간 보고서가 전월 기준으로 열림 | KPI actual이 0 + monthlyAutoRates도 null | update_monthly.py 재실행 |
| 자동화율 그래프 안 바뀜 | index.html const data 동기화 안 됨 | update_monthly.py 3단계 확인 |
| App Runner는 안 바뀌고 Vercel만 바뀜 | git push 안 했거나 GH Actions 실패 | GitHub Actions 탭 확인 |
| KPI 스크립트 에러: kpiMonthly block not found | `--output` 없이 실행 (Dashboard_dev.html 대상) | `--output v12/deploy/index.html` 붙이기 |
| 캐시 사용으로 재계산 안 됨 | Excel mtime 안 바뀜 | `rm v12/v12_data_cache.json` 후 재실행 |
