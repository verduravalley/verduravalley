import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/leadership - Fetch all team members
export async function GET() {
  try {
    const result = await query('SELECT * FROM leadership ORDER BY sort_order ASC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ message: 'Error fetching team members' }, { status: 500 });
  }
}

// POST /api/leadership - Create a new team member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, title, image_url, sort_order } = body;

    const result = await query(
      'INSERT INTO leadership (name, title, image_url, sort_order) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, title, image_url, sort_order || 0]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ message: 'Error creating team member' }, { status: 500 });
  }
}
