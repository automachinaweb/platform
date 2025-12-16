const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  database: 'postgres', // Connect to default DB to create new one
});

async function createDatabase() {
  try {
    await client.connect();
    // Check if database exists
    const checkRes = await client.query("SELECT 1 FROM pg_database WHERE datname = 'platform_db'");
    if (checkRes.rowCount === 0) {
        await client.query('CREATE DATABASE platform_db');
        console.log('Database platform_db created successfully');
    } else {
        console.log('Database platform_db already exists');
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

createDatabase();
