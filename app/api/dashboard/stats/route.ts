import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { errorDetail } from '@/lib/apiError';
import { getAuthFromRequest } from '@/lib/auth';

// GET /api/dashboard/stats - Fetch overview metrics
export async function GET(request: NextRequest) {
  const user = await getAuthFromRequest(request);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const [
      productsResult,
      categoriesResult,
      messagesResult,
      messagesThisMonthResult,
      messagesThisWeekResult,
      recentMessagesResult,
      totalViewsResult,
      viewsTodayResult,
      viewsThisWeekResult,
      viewsThisMonthResult,
      topProductViewsResult,
      dailyViewsResult,
    ] = await Promise.all([
      // Product counts
      query(`
        SELECT
          COUNT(*)::int AS total,
          COUNT(*) FILTER (WHERE is_active = true)::int AS active,
          COUNT(*) FILTER (WHERE is_active = false)::int AS inactive
        FROM products
      `),
      // Products by category
      query(`
        SELECT COALESCE(category, 'Uncategorized') AS category, COUNT(*)::int AS count
        FROM products
        GROUP BY category
        ORDER BY count DESC
      `),
      // Total messages
      query(`SELECT COUNT(*)::int AS total FROM contact_messages`),
      // Messages this month
      query(`
        SELECT COUNT(*)::int AS total FROM contact_messages
        WHERE created_at >= date_trunc('month', CURRENT_DATE)
      `),
      // Messages this week
      query(`
        SELECT COUNT(*)::int AS total FROM contact_messages
        WHERE created_at >= date_trunc('week', CURRENT_DATE)
      `),
      // Recent messages (last 5)
      query(`
        SELECT name, subject, email, created_at
        FROM contact_messages
        ORDER BY created_at DESC
        LIMIT 5
      `),
      // Total page views (all time)
      query(`SELECT COUNT(*)::int AS total FROM page_views`),
      // Views today
      query(`
        SELECT COUNT(*)::int AS total FROM page_views
        WHERE created_at >= CURRENT_DATE
      `),
      // Views this week
      query(`
        SELECT COUNT(*)::int AS total FROM page_views
        WHERE created_at >= date_trunc('week', CURRENT_DATE)
      `),
      // Views this month
      query(`
        SELECT COUNT(*)::int AS total FROM page_views
        WHERE created_at >= date_trunc('month', CURRENT_DATE)
      `),
      // Top viewed products (join with products table for name)
      query(`
        SELECT p.name, p.slug, COUNT(*)::int AS views
        FROM page_views pv
        JOIN products p ON p.slug = pv.slug
        WHERE pv.page = 'product' AND pv.slug IS NOT NULL
        GROUP BY p.name, p.slug
        ORDER BY views DESC
        LIMIT 5
      `),
      // Daily views for last 7 days
      query(`
        SELECT
          d::date AS date,
          COUNT(pv.id)::int AS views
        FROM generate_series(
          CURRENT_DATE - INTERVAL '6 days',
          CURRENT_DATE,
          '1 day'
        ) AS d
        LEFT JOIN page_views pv ON pv.created_at::date = d::date
        GROUP BY d::date
        ORDER BY d::date
      `),
    ]);

    return NextResponse.json({
      products: {
        total: productsResult.rows[0]?.total ?? 0,
        active: productsResult.rows[0]?.active ?? 0,
        inactive: productsResult.rows[0]?.inactive ?? 0,
        categories: categoriesResult.rows,
      },
      messages: {
        total: messagesResult.rows[0]?.total ?? 0,
        thisMonth: messagesThisMonthResult.rows[0]?.total ?? 0,
        thisWeek: messagesThisWeekResult.rows[0]?.total ?? 0,
        recent: recentMessagesResult.rows,
      },
      views: {
        total: totalViewsResult.rows[0]?.total ?? 0,
        today: viewsTodayResult.rows[0]?.total ?? 0,
        thisWeek: viewsThisWeekResult.rows[0]?.total ?? 0,
        thisMonth: viewsThisMonthResult.rows[0]?.total ?? 0,
        topProducts: topProductViewsResult.rows,
        daily: dailyViewsResult.rows,
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { message: 'Error fetching stats', error: errorDetail(error) },
      { status: 500 }
    );
  }
}
