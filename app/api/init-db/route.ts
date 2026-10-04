import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { errorDetail } from '@/lib/apiError';
import { getAuthFromRequest } from '@/lib/auth';

// POST /api/init-db - Initialize database tables
export async function POST(request: NextRequest) {
  const user = await getAuthFromRequest(request);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    // Create leadership table
    await query(`
      CREATE TABLE IF NOT EXISTS leadership (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        image_url TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create products table
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        category VARCHAR(255),
        description TEXT,
        product_info TEXT,
        price DECIMAL(10,2) DEFAULT 0,
        prev_price DECIMAL(10,2),
        images TEXT[],
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add new columns if they don't exist (for existing tables)
    await query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='category') THEN
          ALTER TABLE products ADD COLUMN category VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='product_info') THEN
          ALTER TABLE products ADD COLUMN product_info TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='price') THEN
          ALTER TABLE products ADD COLUMN price DECIMAL(10,2) DEFAULT 0;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='prev_price') THEN
          ALTER TABLE products ADD COLUMN prev_price DECIMAL(10,2);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='updated_at') THEN
          ALTER TABLE products ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
        END IF;
      END $$;
    `);

    // Create contact_messages table
    await query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        subject TEXT,
        name TEXT,
        email TEXT,
        phone TEXT,
        business_name TEXT,
        website TEXT,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create site_configs table
    await query(`
      CREATE TABLE IF NOT EXISTS site_configs (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create page_views table for analytics
    await query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        page VARCHAR(255) NOT NULL,
        slug VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add Arabic columns for bilingual support
    await query(`
      DO $$
      BEGIN
        -- Products Arabic columns
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='name_ar') THEN
          ALTER TABLE products ADD COLUMN name_ar VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='description_ar') THEN
          ALTER TABLE products ADD COLUMN description_ar TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='product_info_ar') THEN
          ALTER TABLE products ADD COLUMN product_info_ar TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='category_ar') THEN
          ALTER TABLE products ADD COLUMN category_ar VARCHAR(255);
        END IF;
        -- Leadership Arabic columns
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leadership' AND column_name='name_ar') THEN
          ALTER TABLE leadership ADD COLUMN name_ar VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leadership' AND column_name='title_ar') THEN
          ALTER TABLE leadership ADD COLUMN title_ar VARCHAR(255);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leadership' AND column_name='images') THEN
          ALTER TABLE leadership ADD COLUMN images TEXT[];
        END IF;
      END $$;
    `);

    // Create categories table
    await query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_ar VARCHAR(255),
        slug VARCHAR(255) UNIQUE NOT NULL,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create orders table
    await query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        total DECIMAL(10,2) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'Pending',
        type VARCHAR(50) DEFAULT 'Delivery',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create admins table
    await query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create custom_requests table
    await query(`
      CREATE TABLE IF NOT EXISTS custom_requests (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        business_name TEXT,
        website TEXT,
        product_name TEXT NOT NULL,
        category TEXT,
        quantity TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed default site configs if they don't exist
    await query(`
      INSERT INTO site_configs (key, value)
      VALUES ('code_of_conduct_url', 'https://res.cloudinary.com/demo/image/upload/multi_page_pdf.pdf')
      ON CONFLICT (key) DO NOTHING
    `);
    await query(`
      INSERT INTO site_configs (key, value)
      VALUES ('contact_phone', '01021002597')
      ON CONFLICT (key) DO NOTHING
    `);
    await query(`
      INSERT INTO site_configs (key, value)
      VALUES ('contact_email', 'info@verduravalley.com')
      ON CONFLICT (key) DO NOTHING
    `);

    return NextResponse.json({ message: 'Database tables created successfully' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { message: 'Error initializing database', error: errorDetail(error) },
      { status: 500 }
    );
  }
}
