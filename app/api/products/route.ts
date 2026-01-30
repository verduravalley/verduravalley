import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/products - Fetch all products
export async function GET() {
  try {
    const result = await query('SELECT * FROM products ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, category, description, product_info, price, prev_price, images, is_active } = body;

    const result = await query(
      `INSERT INTO products (name, slug, category, description, product_info, price, prev_price, images, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, slug, category, description, product_info, price || 0, prev_price || null, images, is_active !== false]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ message: 'Error creating product' }, { status: 500 });
  }
}
