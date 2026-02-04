# Planner Chat Log

## Session 1 (2026-01-26)
- Placeholder for planner conversation notes.

## Session 2 (2026-01-27)
- Role: Main planner for the dashboard project.
- Location updated: `C:\Users\jungwoo.kang\0_dashboard` (avoid OneDrive permission issue).
- Planner task: Maintain meaningful conversation notes here proactively.
- First dashboard scope: automation rate tracking by type for 2026, based on `auto.xlsx`.
- Note: Excel parsing will be selective (only required sheets/columns) to control resource usage.
- Big-picture request: single dashboard with 7 modules, each clickable and auto-updated from source files.
- Web delivery concern: need exec-facing dashboard; no dedicated server available.
- User asked about using a shared `index.html` in OneDrive for dashboard + auto-update on Excel changes.
- Agreed direction: Power BI MVP now, with standardized fields to support future web-code migration.

## Session 3 (2026-01-28)
- Updated dashboard layout: 2 top cards (자동화율, 총 라인 수), panels swapped (공장별 left, 품목별 right).
- Metrics set to 개선전 only; 총합계 forced to bottom of 품목 table.
- Added 공장 매핑 file usage: explicit 공장명 in Line 명 preferred; fallback to 공장 매핑.txt.
- Factory list fixed to 6 sites (화성1/2/3/5, 평택1/2); report unmapped line names in console.


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
