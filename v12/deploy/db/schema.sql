-- MySQL DDL for production (RDS)
-- For local dev, SQLite schema is initialized inline in db/connection.js

CREATE TABLE IF NOT EXISTS equip (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  year        INT NOT NULL DEFAULT 2026,
  month       INT,
  content     VARCHAR(200) NOT NULL DEFAULT '',
  mgr         VARCHAR(50) DEFAULT '',
  amt         DECIMAL(10,1),
  status      VARCHAR(50) DEFAULT '완료',
  note        TEXT,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inwon (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  year        INT NOT NULL DEFAULT 2026,
  no          INT,
  type        VARCHAR(20),
  location    VARCHAR(20),
  category    VARCHAR(50),
  name        VARCHAR(200) NOT NULL DEFAULT '',
  equip       VARCHAR(100),
  mgr         VARCHAR(50),
  headcount   INT DEFAULT 0,
  amt         DECIMAL(10,1),
  receiving   VARCHAR(10),
  months_elapsed INT,
  recovery_rate  DECIMAL(8,4),
  is_new      TINYINT(1) DEFAULT 0,
  note        TEXT,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inwon_monthly (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  inwon_id  INT NOT NULL,
  year      INT NOT NULL DEFAULT 2026,
  month     INT NOT NULL,
  eff       DECIMAL(10,2),
  opr       DECIMAL(5,4),
  FOREIGN KEY (inwon_id) REFERENCES inwon(id) ON DELETE CASCADE,
  UNIQUE KEY uq_inwon_month (inwon_id, year, month)
);

CREATE TABLE IF NOT EXISTS global_exchange (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  year     INT NOT NULL DEFAULT 2026,
  month    INT NOT NULL,
  country  VARCHAR(50) NOT NULL,
  count    INT DEFAULT 0,
  UNIQUE KEY uq_global (year, month, country)
);
