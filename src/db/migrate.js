const pool = require('./pool');
const fs = require('node:fs/promises');
const path = require('path');

async function migrate() {
  const createTable = `
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      name VARCHAR(255) UNIQUE,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(createTable);

  const [rows] = await pool.query('SELECT name FROM migrations');
  const executed = new Set(rows.map((row) => row.name));

  const migrationsDir = path.join(__dirname, 'migrations');
  const files = await fs.readdir(migrationsDir);

  const pending = files
    .filter((file) => file.endsWith('.sql'))
    .sort()
    .filter((file) => !executed.has(file));

  if (pending.length === 0) {
    console.log('Nenhuma migration pendente.');
    return;
  }

  for (const file of pending) {
    const filePath = path.join(migrationsDir, file);
    const sql = await fs.readFile(filePath, 'utf-8');

    console.log(`Executando migration: ${file}...`);
    await pool.query(sql);
    await pool.query('INSERT INTO migrations (name) VALUES (?)', [file]);
    console.log(`Migration ${file} executada com sucesso.`);
  }

  console.log('Todas as migrations foram aplicadas com sucesso.');
}

migrate()
  .catch((err) => {
    console.error('Erro ao executar migrations:', err.message);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
