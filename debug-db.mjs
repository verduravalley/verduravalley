
import { query } from './lib/db';

async function test() {
  try {
    console.log('Checking site_configs table...');
    const res = await query("SELECT count(*) FROM information_schema.tables WHERE table_name = 'site_configs'");
    console.log('Result:', res.rows[0]);
    
    if (res.rows[0].count === '0') {
      console.log('Table site_configs does NOT exist. Running init...');
    } else {
      console.log('Table site_configs exists.');
      const columns = await query("SELECT column_name FROM information_schema.columns WHERE table_name = 'site_configs'");
      console.log('Columns:', columns.rows.map(r => r.column_name));
    }
  } catch (err) {
    console.error('DB Error:', err);
  }
}

test();
