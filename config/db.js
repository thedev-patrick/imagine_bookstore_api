require('dotenv').config(); //Load environment variables
const { Pool } = require('pg');

const pool = new Pool({
  user:  process.env.DB_USER,
  host: process.env.DB_HOST, // or your PostgreSQL host
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432, // PostgreSQL default port
});


pool.on('error', (err) => {
  console.error('Error connecting to PostgreSQL:', err);
});

// Use the pool for database queries
pool.connect((err, client) => {
  if (err) {
    console.error('Error acquiring PostgreSQL client:', err);
    return;
  }
  console.log('Connected to PostgreSQL');
});


module.exports = pool;
