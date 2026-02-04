import pg from 'pg';
import bcrypt from 'bcryptjs';
import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

async function main() {
  const username = await ask('Username: ');
  const email = await ask('Email: ');
  const password = await ask('Password: ');

  if (!username || !email || !password) {
    console.error('All fields are required.');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const pool = new pg.Pool({
    connectionString: process.env.DIRECT_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await pool.query(
      'INSERT INTO admins (username, email, password_hash) VALUES ($1, $2, $3)',
      [username, email, passwordHash]
    );
    console.log(`Admin "${username}" created successfully.`);
  } catch (err) {
    if (err.code === '23505') {
      console.error('An admin with that username or email already exists.');
    } else {
      console.error('Error creating admin:', err.message);
    }
  } finally {
    await pool.end();
    rl.close();
  }
}

main();
