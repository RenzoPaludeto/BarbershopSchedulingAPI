require('dotenv/config');

const required = ['PORT', 'DB_LOGIN', 'DB_PSSWD', 'DB_DATABASE'];

const missing = required.filter((name) => !process.env[name]);

if (missing.length > 0) {
  throw new Error(`Missing environment variable ${missing.join(', ')}`);
}

module.exports = {
  port: Number(process.env.PORT),
  db_login: process.env.DB_LOGIN,
  db_password: process.env.DB_PASSWORD,
  db_database: process.env.DB_DATABASE,
};
