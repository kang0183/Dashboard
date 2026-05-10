const router = require('express').Router();
const { query } = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const rows = await query('SELECT * FROM global_exchange WHERE year = ?', [year]);
    const result = {};
    for (let m = 1; m <= 12; m++) result[m] = {};
    for (const r of rows) {
      result[r.month][r.country] = r.count;
    }
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { year = new Date().getFullYear(), data } = req.body;
    await query('DELETE FROM global_exchange WHERE year = ?', [year]);
    for (const [month, countries] of Object.entries(data || {})) {
      for (const [country, count] of Object.entries(countries)) {
        const n = parseInt(count) || 0;
        if (n > 0) {
          await query(
            'INSERT INTO global_exchange (year, month, country, count) VALUES (?, ?, ?, ?)',
            [year, parseInt(month), country, n]
          );
        }
      }
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
