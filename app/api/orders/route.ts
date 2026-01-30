import { NextRequest, NextResponse } from 'next/server';
import { orders } from '@/lib/data';

// GET /api/orders - Fetch orders with optional type filter
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');

  let filteredOrders = orders;

  if (type && type !== 'all') {
    filteredOrders = orders.filter((o) => o.type === type);
  }

  return NextResponse.json(filteredOrders);
}
