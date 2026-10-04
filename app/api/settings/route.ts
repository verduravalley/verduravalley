import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/auth';

// GET stays public - the marketing site reads contact info from here
export async function GET() {
  try {
    const result = await query(
      `SELECT key, value FROM site_configs WHERE key IN ('contact_phone', 'contact_email')`
    );
    const settings: Record<string, string> = {};
    for (const row of result.rows) {
      settings[row.key] = row.value;
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await getAuthFromRequest(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { contact_phone, contact_email } = await req.json();

    if (contact_phone !== undefined) {
      await query(
        `INSERT INTO site_configs (key, value, updated_at) VALUES ('contact_phone', $1, NOW())
         ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = NOW()`,
        [contact_phone]
      );
    }
    if (contact_email !== undefined) {
      await query(
        `INSERT INTO site_configs (key, value, updated_at) VALUES ('contact_email', $1, NOW())
         ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = NOW()`,
        [contact_email]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
