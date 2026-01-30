import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/contact - Fetch all contact messages (for dashboard)
export async function GET() {
  try {
    const result = await query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ message: 'Error fetching messages' }, { status: 500 });
  }
}

// POST /api/contact - Save a new contact message to database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, name, email, phone, business_name, website, message } = body;

    const result = await query(
      'INSERT INTO contact_messages (subject, name, email, phone, business_name, website, message) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [subject, name, email, phone, business_name, website, message]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ message: 'Error saving message' }, { status: 500 });
  }
}
