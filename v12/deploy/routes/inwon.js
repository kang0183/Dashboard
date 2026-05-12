const router = require('express').Router();
const { query } = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM inwon ORDER BY year, no, id');
    const monthly = await query('SELECT * FROM inwon_monthly');
    const monthlyMap = {};
    for (const m of monthly) {
      if (!monthlyMap[m.inwon_id]) monthlyMap[m.inwon_id] = {};
      monthlyMap[m.inwon_id][m.month] = { eff: m.eff, opr: m.opr };
    }
    res.json(rows.map(r => ({
      id: r.id, year: r.year, no: r.no, type: r.type, location: r.location,
      category: r.category, name: r.name, equip: r.equip, mgr: r.mgr, headcount: r.headcount,
      isNew: !!r.is_new,
      monthly: monthlyMap[r.id] || {},
    })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { year = new Date().getFullYear(), no, type, location, category, name, equip, mgr, headcount, isNew } = req.body;
    const result = await query(
      'INSERT INTO inwon (year, no, type, location, category, name, equip, mgr, headcount, is_new) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [year, no || null, type || null, location || null, category || null, name || '', equip || null, mgr || null, headcount || 0, isNew ? 1 : 0]
    );
    res.json({ id: result.insertId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { no, type, location, category, name, equip, mgr, headcount, isNew } = req.body;
    await query(
      'UPDATE inwon SET no=?, type=?, location=?, category=?, name=?, equip=?, mgr=?, headcount=?, is_new=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
      [no || null, type || null, location || null, category || null, name || '', equip || null, mgr || null, headcount || 0, isNew ? 1 : 0, req.params.id]
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await query('DELETE FROM inwon WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/:id/monthly', async (req, res) => {
  try {
    const inwonId = req.params.id;
    const { year = new Date().getFullYear(), monthly } = req.body;
    await query('DELETE FROM inwon_monthly WHERE inwon_id = ? AND year = ?', [inwonId, year]);
    for (const [month, vals] of Object.entries(monthly || {})) {
      const eff = vals.eff !== '' ? parseFloat(vals.eff) : null;
      const opr = vals.opr !== '' ? parseFloat(vals.opr) : null;
      if (eff != null || opr != null) {
        await query(
          'INSERT INTO inwon_monthly (inwon_id, year, month, eff, opr) VALUES (?, ?, ?, ?, ?)',
          [inwonId, year, parseInt(month), eff, opr]
        );
      }
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
