import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { errorDetail } from '@/lib/apiError';
import { getAuthFromRequest } from '@/lib/auth';
import { slugify } from '@/lib/slugify';

// PUT /api/categories/[id] - Update a category
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthFromRequest(request);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, name_ar, sort_order } = body;

    if (!name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    const slug = slugify(name) || `category_${Date.now()}`;

    const result = await query(
      `UPDATE categories SET name = $1, name_ar = $2, slug = $3, sort_order = $4
       WHERE id = $5 RETURNING *`,
      [name, name_ar || null, slug, sort_order || 0, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating category:', error);

    // Slugs are derived from the name, so a duplicate name is the likely cause.
    if ((error as { code?: string })?.code === '23505') {
      return NextResponse.json(
        { message: 'A category with this name already exists. Use a different name.' },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: 'Error updating category', error: errorDetail(error) }, { status: 500 });
  }
}

// DELETE /api/categories/[id] - Delete a category
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthFromRequest(request);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await query('DELETE FROM categories WHERE id = $1', [id]);
    return NextResponse.json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ message: 'Error deleting category', error: errorDetail(error) }, { status: 500 });
  }
}
