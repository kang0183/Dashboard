# Dashboard Project Log

## Session 1 (2026-01-26)
- Goal: Build a dashboard in `C:\Users\jungwoo.kang\OneDrive - COSMAX\0_dashboard` that auto-updates when source files are updated.
- Team roles: User + 2 terminals (you = main developer, another terminal = main planner, user).
- Requirement: Maintain a persistent conversation log so future terminal sessions can continue with context.

## Decisions
- (pending) Dashboard technology and data sources need to be defined.

## Open Questions
- What are the source files to monitor (paths, formats)?
- What is the desired dashboard format (web page, Excel, Streamlit, Power BI, etc.)?
- Update mechanism (manual refresh, scheduled, file watcher)?
- Layout/sections needed on the dashboard?
## Session 2 (2026-01-27)
- User moved dashboard folder to `C:\0_dashboard` due to OneDrive permission issues.
- `DASHBOARD_LOG.md` removed; continuing with `DEV_CHAT_LOG.md` and `PLANNER_CHAT_LOG.md` here.
- Plan: auto-update logs without explicit prompts going forward.
 - Location now confirmed as `C:\Users\jungwoo.kang\0_dashboard` (sandbox-writable).
 - Source file identified: `C:\Users\jungwoo.kang\0_dashboard\auto.xlsx`.
 - Initial dashboard focus: "GCC 수립한 자동화율 진척 관리 시트 (유형별)" with tracking by type (기초/파우더 등) and targets for 2026.
 - Excel reading libraries installed: `pandas` and `openpyxl` (2026-01-27).
 - Resource concern noted: will read only required sheets/columns to minimize load.
 - Power BI Desktop in use; MVP loads only `Master Sheet` and `피벗` to reduce query time.
 - Power Query error observed in `Master Sheet`: DataFormat.Error due to `#REF!` cell values.
 - HTML MVP path started: added `generate_dashboard.py` to read `auto.xlsx` (pivot header=2) and generate `index.html`.
 - Generator computes overall automation rates from `Master Sheet` and item/factory summaries.
## Session 3 (2026-01-27)
- User moved dashboard folder to `C:\Users\jungwoo.kang\0_dashboard` to minimize approval prompts.
- Active logs are now in this path.

## Session 4 (2026-01-28)
- Updated dashboard generator to use improvement-pre metrics only; removed improvement-post card; top cards now 2 columns (자동화율, 총 라인 수).
- Swapped panel positions: 공장별 자동화율 left, 품목별 자동화율 right.
- Ensured 품목별 자동화율 table keeps 총합계 at bottom.
- Added schema validation for required columns; errors report missing fields.
- Implemented 공장 매핑 logic: explicit 공장명 in Line 명 takes priority, else lookup from 공장 매핑.txt, else 미지정.
- Factory list fixed to 6 sites (화성1/2/3/5, 평택1/2) in order.
- generate_dashboard.py now prints 미지정 라인명 in console after build; latest run had none.
- Rebuilt index.html from auto.xlsx.

## Session 5 (2026-01-28)
- Added single-file UI (index_single.html) with sidebar-less history navigation and back button support; removed extra labels like “Single File” and “갱신”.
- Factory and item drilldowns support line-level detail pages; line names no longer append factory suffixes.
- Bar tooltips show 자동공정/총공정; applied to 공장/품목/라인 views.
- Added 0% line fix: when master totals are 0 but detail processes exist, compute rate from process list.
- Built a multi-category variant with sidebar (투자효과 / KPI 관리지표) and fixed Korean mojibake by regenerating UTF-8.
- KPI cards now use 금액(인원합리화), 건수(설비개선/글로벌 생산기술), and 인시생산성 is weighted average.
- KPI section includes cumulative monthly chart with Y-axis, legend, and hover tooltip (계획/실적 누계).
- File renamed by user to `Dashboard.html`.


## Session 6 (2026-01-29)
- User clarified: "2??" exclusion refers to ??2?? only (??2 ??).
- Updated automation dashboard data in Dashboard.html using new Excel source (????? ??), excluding ??2?? and ??? ??; added ??2 ?????/???? mapping so lines are assigned.
- Adjusted ??? ???? to be computed from filtered Master Sheet (so excluded lines/factories do not appear in item stats).
- Updated label for total line count to '?? ?? ?? ??' in automation section.


- Added exceptions for ??? ??: ??????1~4, ?????? ?? ????? ?? ??.

- Added inclusion exceptions so ??? ?? ? ??????1~4/?????? ??? ?? (??/??/?? ??? ??).

- Removed 'GCC' from automation section title and added factory line sort toggle (????/??) in automation section; factory view now renders lines with selected sort.

- Fixed factory-line render JS string escaping and cleaned factory sort controls markup in Dashboard.html; removed 'GCC' prefix from automation title/button.

- Fixed broken item-bars indexOf string in Dashboard.html that stopped JS init from running (restores automation section rendering).

- Updated KPI tooltip text to use single-line separator (removed newline escape that rendered as "n").

- KPI tooltip order changed to ??/?? and separator set to ':' instead of '|'.

- KPI legend labels simplified (removed '(??)' and '(???)').

## Session 7 (2026-02-03)
- Created design skeleton file `C:\Users\jungwoo.kang\0_dashboard\Dashboard_design.html` (v3) based on reference images + UX principles link; layout uses left sidebar, top KPI cards, central charts, bottom summary, right insight panels.
- Added automation page skeleton with "충포장 공정 자동화율 향상 목표" banner and KPI cards; KPI page shows remaining KPI items only (excluded 외주전략고도화 / PT양산적합률 / 맞춤형 충전설비 소형화).
- Implemented responsive layout (<=1000px single column), CSS variables, gradients, and placeholder charts without real data.

## Session 8 (2026-02-03)
- Rebased `Dashboard_design.html` on `Dashboard.html` to keep drill-down, hover tooltips, and navigation logic.
- Applied light theme + Pretendard/SUIT font stack, added left sidebar filters and right insight panel, and inserted automation goal banner.
- Preserved existing IDs/JS for automation/factory/item/line views and KPI chart interactions.

## Session 9 (2026-02-03)
- Issue: text mojibake occurred when editing HTML via PowerShell `Get-Content/Set-Content` without explicit UTF-8; this can replace non-ASCII with '?' and corrupt labels.
- Fix: regenerate `Dashboard.html` via `generate_dashboard.py`, then rebuild `Dashboard_design.html` using a Python transformation (UTF-8 read/write) to preserve Korean text and avoid further corruption.
- Guidance: avoid PowerShell `Set-Content` on UTF-8 files unless `-Encoding utf8` is explicitly set; prefer Python read/write for edits.

## Session 10 (2026-02-03)
- Rebuilt `Dashboard_design.html` from freshly generated `Dashboard.html` (automation-only) to preserve drill-down + tooltip JS without mojibake.
- Added light-theme layout shell (sidebar + right panel) and inserted KPI skeleton section; added automation goal banner and updated line-count delta to "충,포장 라인" in design file.
- Process note: use Python UTF-8 read/write; avoid PowerShell re-save to prevent text corruption.

## Session 11 (2026-02-03)
- Created `Dashboard_design_article.html` based on `Dashboard_design_v5.html` with a news/articles list-detail panel in the '?? & ????' section.
- Articles are loaded from `articles_curated.csv` (OneDrive ??/article) and rendered with search, list selection, and detail pane.
- Added article-specific CSS and responsive stacked layout for smaller screens.


- 2026-02-03: Updated Dashboard_design_v6.html article module text/kpi defaults, cleaned article CSS, added selector+list layout styling, and removed placeholder '??' strings in JS (using unicode escapes).

- 2026-02-03: Added C:\Users\jungwoo.kang\0_dashboard\Update-Dashboard.ps1 to inject latest articles into Dashboard_design_v6.html and hooked it into korea_mfg_top50 Run-Daily_ToMe.ps1.

- 2026-02-03: Updated Update-Dashboard.ps1 to remap company using companies_seed.csv (fallback to ??) and added CompaniesCsv parameter + auto-discovery.

- 2026-02-03: Removed -KeywordOnly from korea_mfg_top50 Run-Daily_ToMe.ps1; appended discovered companies into companies_seed.csv with filters and removed AI?? row.

- 2026-02-03: Updated Update-Dashboard.ps1 default output to Dashboard_design_v8.html and added tech tag normalization; Run-Daily_ToMe.ps1 now passes v8 dashboard path.