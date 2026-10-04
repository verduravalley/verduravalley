import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getAuthFromRequest } from '@/lib/auth';
import { errorDetail } from '@/lib/apiError';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/upload - Upload file to Cloudinary
export async function POST(request: NextRequest) {
  const user = await getAuthFromRequest(request);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { file, folder = 'organiyo', resourceType = 'image' } = body;

    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: resourceType as 'image' | 'raw' | 'video' | 'auto',
    });

    return NextResponse.json({
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Error uploading file', error: errorDetail(error) },
      { status: 500 }
    );
  }
}
