import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST /api/views - Record a page view
export async function POST(request: NextRequest) {
  try {
    const { page, slug } = await request.json();

    if (!page) {
      return NextResponse.json({ message: 'Missing page' }, { status: 400 });
    }

    await query(
      'INSERT INTO page_views (page, slug) VALUES ($1, $2)',
      [page, slug || null]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Silently fail - don't break user experience for analytics
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
