import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/auth';

// GET /api/orders - Fetch orders with optional type filter (auth required)
export async function GET(request: NextRequest) {
  const user = await getAuthFromRequest(request);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    let sql = 'SELECT * FROM orders ORDER BY created_at DESC';
    const params: string[] = [];

    if (type && type !== 'all') {
      sql = 'SELECT * FROM orders WHERE type = $1 ORDER BY created_at DESC';
      params.push(type);
    }

    const result = await query(sql, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
  }
}
