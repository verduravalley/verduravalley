import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DIRECT_URL,
  ssl: process.env.DIRECT_URL?.includes('supabase.com') ||
       process.env.DIRECT_URL?.includes('neon.tech') ||
       process.env.DIRECT_URL?.includes('railway.app') ? { rejectUnauthorized: false } : false,
});

async function checkCols() {
  try {
    const result = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'leadership'");
    console.log('Columns in leadership table:', result.rows.map(r => r.column_name));
    
    if (result.rows.length === 0) {
      console.log('Leadership table does not exist!');
    }
  } catch (e) {
    console.error('Error checking columns:', e);
  } finally {
    await pool.end();
    process.exit();
  }
}

checkCols();
