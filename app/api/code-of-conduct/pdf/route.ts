import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/code-of-conduct/pdf - Proxy the PDF with correct headers for inline display
export async function GET() {
  try {
    const result = await query("SELECT value FROM site_configs WHERE key = 'code_of_conduct_url'");

    if (result.rows.length === 0 || !result.rows[0].value) {
      return NextResponse.json({ message: 'No document found' }, { status: 404 });
    }

    const pdfUrl = result.rows[0].value;
    const pdfResponse = await fetch(pdfUrl);

    if (!pdfResponse.ok) {
      return NextResponse.json({ message: 'Failed to fetch document' }, { status: 502 });
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error proxying PDF:', error);
    return NextResponse.json({ message: 'Error fetching document' }, { status: 500 });
  }
}
