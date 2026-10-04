import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { errorDetail } from '@/lib/apiError';
import { getAuthFromRequest } from '@/lib/auth';
import { slugify } from '@/lib/slugify';

// GET /api/categories - Fetch all categories
export async function GET() {
  try {
    // The schema is owned by scripts/setup-db.mjs and POST /api/init-db;
    // this route used to re-run its CREATE TABLE on every request, doubling
    // the queries on the busiest dashboard page.
    const result = await query('SELECT * FROM categories ORDER BY sort_order ASC, name ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ message: 'Error fetching categories', error: errorDetail(error) }, { status: 500 });
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  const user = await getAuthFromRequest(request);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { name, name_ar, sort_order } = body;

    if (!name) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    const slug = slugify(name) || `category_${Date.now()}`;

    const result = await query(
      `INSERT INTO categories (name, name_ar, slug, sort_order)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, name_ar || null, slug, sort_order || 0]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);

    // Slugs are derived from the name, so a duplicate name is the likely cause.
    if ((error as { code?: string })?.code === '23505') {
      return NextResponse.json(
        { message: 'A category with this name already exists. Use a different name.' },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: 'Error creating category', error: errorDetail(error) }, { status: 500 });
  }
}
