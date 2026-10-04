import { Pool } from 'pg';

// Supabase and other cloud databases require SSL
const isCloudDb = process.env.DIRECT_URL?.includes('supabase.com') ||
                  process.env.DIRECT_URL?.includes('supabase.co') ||
                  process.env.DIRECT_URL?.includes('neon.tech') ||
                  process.env.DIRECT_URL?.includes('railway.app');

// Each serverless instance gets its own pool, and several run at once, so the
// per-instance cap has to stay well under the database's connection limit.
// Supabase's session-mode pooler allows 15 in total; node-postgres defaults to
// 10 per pool, which two warm instances are enough to exhaust - that surfaces
// as "max clients reached in session mode" and takes the whole dashboard down.
// Idle connections are released rather than held for the life of the instance.
const MAX_CONNECTIONS = Number(process.env.PG_POOL_MAX ?? 3);

// Reused across hot reloads in development, where re-evaluating this module
// would otherwise leave a pool behind on every edit.
const globalForDb = globalThis as unknown as { pgPool?: Pool };

const pool =
  globalForDb.pgPool ??
  new Pool({
    connectionString: process.env.DIRECT_URL,
    ssl: isCloudDb ? { rejectUnauthorized: false } : false,
    max: MAX_CONNECTIONS,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
  });

globalForDb.pgPool = pool;

// A pool emits errors for idle clients dropped by the server; without a
// listener those reach the process as unhandled exceptions.
pool.on('error', (err) => {
  console.error('Postgres pool error:', err.message);
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
