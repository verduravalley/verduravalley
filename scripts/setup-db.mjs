// One-shot setup for a fresh database.
//
//   DIRECT_URL="postgresql://..." node scripts/setup-db.mjs
//
// Applies the schema and creates the first admin. POST /api/init-db needs an
// admin to authenticate, and the admins table does not exist yet on a new
// database, so that route cannot bootstrap one - this script is the way in.
//
// Safe to re-run: the schema is idempotent and an existing admin is left alone.
import pg from 'pg';
import bcrypt from 'bcryptjs';
import { createInterface } from 'readline';
import { schemaStatements } from '../lib/schema.mjs';

// Opened only if we actually need to prompt, so the script stays usable when
// stdin is closed (CI, or a piped run).
let rl;
const ask = (q) => {
  rl ??= createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(q, resolve));
};

async function main() {
  const connectionString = process.env.DIRECT_URL;
  if (!connectionString) {
    console.error('DIRECT_URL is not set. Point it at the new database and re-run.');
    process.exit(1);
  }

  // Same rule as lib/db.ts: managed Postgres requires SSL, a local one does not.
  const isCloudDb = ['supabase.com', 'supabase.co', 'neon.tech', 'railway.app']
    .some((host) => connectionString.includes(host));

  const pool = new pg.Pool({
    connectionString,
    ssl: isCloudDb ? { rejectUnauthorized: false } : false,
  });

  try {
    const { rows: [{ db, host }] } = await pool.query(
      'SELECT current_database() AS db, inet_server_addr()::text AS host'
    );
    console.log(`Connected to "${db}"${host ? ` at ${host}` : ''}.`);

    console.log(`Applying schema (${schemaStatements.length} statements)...`);
    for (const statement of schemaStatements) {
      await pool.query(statement);
    }
    console.log('Schema applied.');

    const { rows: [{ count }] } = await pool.query('SELECT COUNT(*)::int AS count FROM admins');
    if (count > 0) {
      console.log(`${count} admin account(s) already exist - skipping admin creation.`);
      console.log('Done.');
      return;
    }

    console.log('\nNo admin accounts yet. Creating the first one.');

    // ADMIN_* env vars allow an unattended run; otherwise prompt.
    const username = (process.env.ADMIN_USERNAME ?? await ask('Username: ')).trim();
    const email = (process.env.ADMIN_EMAIL ?? await ask('Email: ')).trim();
    const password = process.env.ADMIN_PASSWORD ?? await ask('Password: ');

    if (!username || !email || !password) {
      console.error('All fields are required. Schema is applied; re-run to create the admin.');
      process.exitCode = 1;
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO admins (username, email, password_hash) VALUES ($1, $2, $3)',
      [username, email, passwordHash]
    );

    console.log(`\nAdmin "${username}" created. Sign in at /en/sign-in with ${email}.`);
    console.log('Done.');
  } catch (err) {
    console.error('Setup failed:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
    rl?.close();
  }
}

main();
