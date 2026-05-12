const path = require('path');

const isMySQL = !!process.env.DB_HOST;
let _pool, _sqlite;

const SQLITE_DDL = `
  CREATE TABLE IF NOT EXISTS equip (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL DEFAULT 2026,
    month INTEGER,
    content TEXT NOT NULL DEFAULT '',
    mgr TEXT DEFAULT '',
    amt REAL,
    status TEXT DEFAULT '완료',
    note TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS inwon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL DEFAULT 2026,
    no INTEGER,
    type TEXT,
    location TEXT,
    category TEXT,
    name TEXT NOT NULL DEFAULT '',
    equip TEXT,
    mgr TEXT,
    headcount INTEGER DEFAULT 0,
    is_new INTEGER DEFAULT 0,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS inwon_monthly (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inwon_id INTEGER NOT NULL,
    year INTEGER NOT NULL DEFAULT 2026,
    month INTEGER NOT NULL,
    eff REAL,
    opr REAL,
    FOREIGN KEY (inwon_id) REFERENCES inwon(id) ON DELETE CASCADE,
    UNIQUE(inwon_id, year, month)
  );
  CREATE TABLE IF NOT EXISTS global_exchange (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL DEFAULT 2026,
    month INTEGER NOT NULL,
    country TEXT NOT NULL,
    count INTEGER DEFAULT 0,
    UNIQUE(year, month, country)
  );
`;

function getPool() {
  if (!_pool) {
    const mysql = require('mysql2/promise');
    _pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return _pool;
}

function getSqlite() {
  if (!_sqlite) {
    const Database = require('better-sqlite3');
    _sqlite = new Database(path.join(__dirname, '../cosmax.db'));
    _sqlite.pragma('journal_mode = WAL');
    _sqlite.pragma('foreign_keys = ON');
    _sqlite.exec(SQLITE_DDL);
    // migrations for columns added after initial schema
    try { _sqlite.exec("ALTER TABLE inwon ADD COLUMN location TEXT"); } catch (_) {}
    try { _sqlite.exec("ALTER TABLE equip ADD COLUMN location TEXT"); } catch (_) {}
  }
  return _sqlite;
}

async function query(sql, params = []) {
  if (isMySQL) {
    const [rows] = await getPool().execute(sql, params);
    return rows;
  }
  const db = getSqlite();
  const stmt = db.prepare(sql);
  if (sql.trim().toUpperCase().startsWith('SELECT')) {
    return stmt.all(...params);
  }
  const info = stmt.run(...params);
  return { insertId: info.lastInsertRowid, affectedRows: info.changes };
}

module.exports = { query, isMySQL };
