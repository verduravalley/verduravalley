const { Pool } = require('pg');

const DIRECT_URL = "postgresql://postgres.utmqhbnvpibilibcjzcu:venduravalleywebsite@aws-1-eu-west-1.pooler.supabase.com:5432/postgres";

const pool = new Pool({
  connectionString: DIRECT_URL,
  ssl: { rejectUnauthorized: false },
});

async function test() {
  try {
    console.log('Testing DB connection...');
    const res = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    console.log('Success! Count:', res.rows.length);
    if (res.rows.length > 0) {
        console.log('First row:', JSON.stringify(res.rows[0], null, 2));
    }
  } catch (err) {
    console.error('Error code:', err.code);
    console.error('Error message:', err.message);
  } finally {
    await pool.end();
  }
}

test();
