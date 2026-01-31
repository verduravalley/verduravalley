import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/leadership/[id] - Fetch a single team member
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const result = await query('SELECT * FROM leadership WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json({ message: 'Error fetching team member' }, { status: 500 });
  }
}

// PUT /api/leadership/[id] - Update a team member
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { name, title, image_url, sort_order, name_ar, title_ar } = body;

    const result = await query(
      'UPDATE leadership SET name = $1, title = $2, image_url = $3, sort_order = $4, name_ar = $5, title_ar = $6 WHERE id = $7 RETURNING *',
      [name, title, image_url, sort_order, name_ar || null, title_ar || null, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ message: 'Error updating team member' }, { status: 500 });
  }
}

// DELETE /api/leadership/[id] - Delete a team member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const result = await query('DELETE FROM leadership WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Team member deleted' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ message: 'Error deleting team member' }, { status: 500 });
  }
}
