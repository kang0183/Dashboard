'use strict';
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.use('/api/equip',  require('./routes/equip'));
app.use('/api/inwon',  require('./routes/inwon'));
app.use('/api/global', require('./routes/global'));

app.get('/health', (_req, res) => res.send('ok'));

async function seedIfEmpty() {
  const { query, isMySQL } = require('./db/connection');
  if (isMySQL) return; // MySQL은 수동으로 관리

  const { SEED_EQUIP, SEED_INWON } = require('./db/seed');

  const equipCount = await query('SELECT COUNT(*) as cnt FROM equip');
  if ((equipCount[0]?.cnt ?? equipCount[0]?.['COUNT(*)'] ?? 0) === 0) {
    for (const d of SEED_EQUIP) {
      await query(
        'INSERT OR IGNORE INTO equip (id, year, month, mgr, content, status, amt, note) VALUES (?,?,?,?,?,?,?,?)',
        [d.id, d.year, d.month, d.mgr||'', d.content||'', d.status||'완료', d.amt??null, d.note||'']
      );
    }
    console.log(`Seeded ${SEED_EQUIP.length} equip rows`);
  }

  const inwonCount = await query('SELECT COUNT(*) as cnt FROM inwon');
  if ((inwonCount[0]?.cnt ?? inwonCount[0]?.['COUNT(*)'] ?? 0) === 0) {
    for (const d of SEED_INWON) {
      await query(
        'INSERT OR IGNORE INTO inwon (id, year, no, type, category, name, equip, mgr, headcount, amt, receiving, months_elapsed, recovery_rate, is_new) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,0)',
        [d.id, d.year, d.no, d.type||null, d.category||null, d.name||'', d.equip||null, d.mgr||null, d.headcount||0, d.amt??null, d.receiving||null, d.months_elapsed??null, d.recovery_rate??null]
      );
      // 월별 효과 데이터
      for (const [month, vals] of Object.entries(d.monthly || {})) {
        await query(
          'INSERT OR IGNORE INTO inwon_monthly (inwon_id, year, month, eff) VALUES (?,?,?,?)',
          [d.id, d.year, parseInt(month), vals]
        );
      }
    }
    console.log(`Seeded ${SEED_INWON.length} inwon rows`);
  }
}

app.listen(PORT, async () => {
  console.log(`Dashboard server running on port ${PORT}`);
  try { await seedIfEmpty(); } catch (e) { console.error('Seed error:', e.message); }
});
