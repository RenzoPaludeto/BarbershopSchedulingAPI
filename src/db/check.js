const pool = require('./pool');

async function main() {
  const [rows] = await pool.query('SELECT 1 AS connected');
  console.log(rows);
  await pool.end();
  return rows;
}

main().catch((err) => {
  console.error('Failing to connect with db', err.message);
  process.exit(1);
});
