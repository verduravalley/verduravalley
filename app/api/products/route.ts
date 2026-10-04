import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { errorDetail } from '@/lib/apiError';
import { getAuthFromRequest } from '@/lib/auth';

// GET /api/products - Fetch all products
export async function GET() {
  try {
    const result = await query('SELECT * FROM products ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ 
      message: 'Error fetching products',
      error: errorDetail(error)
    }, { status: 500 });
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  const user = await getAuthFromRequest(request);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { name, slug, category, description, product_info, price, prev_price, images, is_active, name_ar, description_ar, product_info_ar, category_ar } = body;

    const result = await query(
      `INSERT INTO products (name, slug, category, description, product_info, price, prev_price, images, is_active, name_ar, description_ar, product_info_ar, category_ar)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [name, slug, category, description, product_info, price || 0, prev_price || null, images, is_active !== false, name_ar || null, description_ar || null, product_info_ar || null, category_ar || null]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);

    // Slugs are derived from the product name, so a duplicate name is the
    // likely cause here - say so instead of a bare 500.
    if ((error as { code?: string })?.code === '23505') {
      return NextResponse.json(
        { message: 'A product with this name already exists. Use a different name.' },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: 'Error creating product' }, { status: 500 });
  }
}
