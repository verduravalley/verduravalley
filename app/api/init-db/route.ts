import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/auth';
import { errorDetail } from '@/lib/apiError';
import { schemaStatements } from '@/lib/schema.mjs';

// POST /api/init-db - Bring the database up to the current schema.
// Every statement is idempotent, so this is safe to re-run.
// A brand new database has no admin to authenticate with - bootstrap it with
// `node scripts/setup-db.mjs`, which applies the same schema over DIRECT_URL.
export async function POST(request: NextRequest) {
  const user = await getAuthFromRequest(request);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    for (const statement of schemaStatements) {
      await query(statement);
    }

    return NextResponse.json({ message: 'Database tables created successfully' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { message: 'Error initializing database', error: errorDetail(error) },
      { status: 500 }
    );
  }
}
