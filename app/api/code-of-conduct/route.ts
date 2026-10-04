import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { errorDetail } from '@/lib/apiError';
import { getAuthFromRequest } from '@/lib/auth';

// GET stays public - the marketing site reads the PDF URL from here
export async function GET() {
  try {
    const result = await query("SELECT value FROM site_configs WHERE key = 'code_of_conduct_url'");
    
    if (result.rows.length > 0) {
      return NextResponse.json({ pdfUrl: result.rows[0].value });
    }
    
    return NextResponse.json({ pdfUrl: null });
  } catch (error: any) {
    // If table doesn't exist, just return null instead of crashing
    if (error?.code === '42P01') { // PostgreSQL "undefined_table" code
      return NextResponse.json({ pdfUrl: null });
    }
    
    console.error('Error fetching code of conduct:', error);
    return NextResponse.json({ 
      message: 'Error fetching data', 
      error: errorDetail(error) 
    }, { status: 500 });
  }
}

// POST /api/code-of-conduct - Update PDF URL in database
export async function POST(request: NextRequest) {
  const user = await getAuthFromRequest(request);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { pdfUrl } = body;

    if (!pdfUrl) {
      return NextResponse.json({ message: 'Missing pdfUrl' }, { status: 400 });
    }

    await query(
      `INSERT INTO site_configs (key, value) VALUES ('code_of_conduct_url', $1)
       ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = CURRENT_TIMESTAMP`,
      [pdfUrl]
    );

    return NextResponse.json({
      pdfUrl: pdfUrl,
      message: 'Updated successfully',
    });
  } catch (error) {
    console.error('Error updating code of conduct:', error);
    return NextResponse.json({ 
      message: 'Error updating data', 
      error: errorDetail(error) 
    }, { status: 500 });
  }
}
