import { Pool } from 'pg';

// Supabase and other cloud databases require SSL
const isCloudDb = process.env.DIRECT_URL?.includes('supabase.com') ||
                  process.env.DIRECT_URL?.includes('neon.tech') ||
                  process.env.DIRECT_URL?.includes('railway.app');

const pool = new Pool({
  connectionString: process.env.DIRECT_URL,
  ssl: isCloudDb ? { rejectUnauthorized: false } : false,
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
