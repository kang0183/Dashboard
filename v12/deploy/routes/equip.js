const router = require('express').Router();
const { query } = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const rows = await query('SELECT * FROM equip WHERE year = ? ORDER BY month, id', [year]);
    res.json(rows.map(r => ({
      id: r.id, year: r.year, month: r.month,
      mgr: r.mgr, content: r.content, status: r.status,
      amt: r.amt, note: r.note,
    })));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { year = new Date().getFullYear(), month, mgr, content, status, amt, note } = req.body;
    const result = await query(
      'INSERT INTO equip (year, month, mgr, content, status, amt, note) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [year, month || null, mgr || '', content || '', status || '완료', amt != null ? amt : null, note || '']
    );
    res.json({ id: result.insertId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { month, mgr, content, status, amt, note } = req.body;
    await query(
      'UPDATE equip SET month=?, mgr=?, content=?, status=?, amt=?, note=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
      [month || null, mgr || '', content || '', status || '완료', amt != null ? amt : null, note || '', req.params.id]
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await query('DELETE FROM equip WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
