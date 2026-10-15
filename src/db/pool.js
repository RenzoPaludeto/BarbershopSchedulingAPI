const mysql = require('mysql2/promise');
const { db_login, db_psswd, db_database } = require('../config');

const pool = mysql.createPool({
  host: 'localhost',
  user: db_login,
  password: db_psswd,
  database: db_database,
  timezone: 'Z',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = pool;
