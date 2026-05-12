#!/usr/bin/env python3
"""
월별 대시보드 업데이트 자동화 스크립트
실행: python3 v12/update_monthly.py
"""
import subprocess, sys, re
from pathlib import Path

ROOT = Path(__file__).parent.parent
V12  = Path(__file__).parent
DEPLOY = V12 / 'deploy'
HTML = DEPLOY / 'index.html'
DATA_JSON = DEPLOY / 'data.json'

def run(cmd, cwd=ROOT):
    print(f'  $ {" ".join(str(c) for c in cmd)}')
    result = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)
    if result.stdout.strip():
        print('   ', result.stdout.strip())
    if result.returncode != 0:
        print('   ERROR:', result.stderr.strip())
        sys.exit(1)

def sync_data_json_to_html():
    """data.json 내용을 index.html const data = {...} 블록에 반영"""
    html = HTML.read_text(encoding='utf-8')
    new_data = DATA_JSON.read_text(encoding='utf-8').strip()

    idx = html.find('const data = ')
    if idx == -1:
        print('   ERROR: const data 블록을 찾을 수 없음')
        sys.exit(1)

    brace_start = html.index('{', idx)
    depth, pos = 0, brace_start
    while pos < len(html):
        if html[pos] == '{': depth += 1
        elif html[pos] == '}':
            depth -= 1
            if depth == 0: brace_end = pos + 1; break
        pos += 1

    HTML.write_text(html[:brace_start] + new_data + html[brace_end:], encoding='utf-8')

    m = re.search(r'"monthlyAutoRates":\s*\[[^\]]+\]',
                  HTML.read_text(encoding='utf-8'))
    print(f'   {m.group(0) if m else "monthlyAutoRates 없음"}')

def main():
    print('=' * 55)
    print(' COSMAX 대시보드 월별 업데이트')
    print('=' * 55)

    print('\n[1/3] 자동화율 데이터 갱신 (update_v12.py)')
    run([sys.executable, 'v12/update_v12.py'])

    print('\n[2/3] KPI 데이터 갱신 (update_kpi_v12.py)')
    run([sys.executable, 'v12/update_kpi_v12.py',
         '--output', str(HTML)])

    print('\n[3/3] index.html const data 블록 동기화')
    sync_data_json_to_html()
    print('   완료')

    print('\n' + '=' * 55)
    print(' 완료! 다음 단계:')
    print('   git add v12/deploy/index.html v12/deploy/data.json')
    print('   git commit -m "Update: N월 데이터"')
    print('   git push origin main          # kang0183/Dashboard (백업)')
    print('   git push company main         # CM-PE-Division (App Runner 배포)')
    print('   bash v12/deploy.sh            # Vercel 배포')
    print('=' * 55)

if __name__ == '__main__':
    main()
