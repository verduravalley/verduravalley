import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/products/[id] - Fetch a single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ message: 'Error fetching product' }, { status: 500 });
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { name, slug, category, description, product_info, price, prev_price, images, is_active, name_ar, description_ar, product_info_ar, category_ar } = body;

    const result = await query(
      `UPDATE products SET
        name = $1, slug = $2, category = $3, description = $4, product_info = $5,
        price = $6, prev_price = $7, images = $8, is_active = $9, updated_at = NOW(),
        name_ar = $10, description_ar = $11, product_info_ar = $12, category_ar = $13
       WHERE id = $14 RETURNING *`,
      [name, slug, category, description, product_info, price || 0, prev_price || null, images, is_active, name_ar || null, description_ar || null, product_info_ar || null, category_ar || null, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ message: 'Error updating product' }, { status: 500 });
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const result = await query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
  }
}
