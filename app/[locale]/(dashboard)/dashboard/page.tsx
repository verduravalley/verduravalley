'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  Package,
  Mail,
  Eye,
  ArrowRight,
  TrendingUp,
  Calendar,
  Loader2,
  Database,
  BarChart3,
} from 'lucide-react';

interface Stats {
  products: {
    total: number;
    active: number;
    inactive: number;
    categories: { category: string; count: number }[];
  };
  messages: {
    total: number;
    thisMonth: number;
    thisWeek: number;
    recent: { name: string; subject: string; email: string; created_at: string }[];
  };
  views: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    topProducts: { name: string; slug: string; views: number }[];
    daily: { date: string; views: number }[];
  };
}

export default function DashboardHome() {
  const t = useTranslations('dashboard.overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<string | null>(null);
  const [dbLoading, setDbLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/dashboard/stats');
      setStats(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  const initializeDatabase = async () => {
    setDbLoading(true);
    setDbStatus(null);
    try {
      await axios.post('/api/init-db');
      setDbStatus('Database initialized successfully!');
      setLoading(true);
      fetchStats();
    } catch (err: any) {
      setDbStatus('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setDbLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6" /> {t('title')}
        </h1>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 font-medium mb-2">{t('couldNotLoad')}</h3>
          <p className="text-gray-500 text-sm mb-6">{error || t('dbNotInitialized')}</p>
          <button
            onClick={initializeDatabase}
            disabled={dbLoading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 text-sm font-medium"
          >
            {dbLoading ? t('initializing') : t('initializeDb')}
          </button>
          {dbStatus && (
            <p className={`mt-4 text-sm ${dbStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {dbStatus === 'Database initialized successfully!' ? t('dbInitSuccess') : dbStatus}
            </p>
          )}
        </div>
      </div>
    );
  }

  const maxDailyViews = Math.max(...stats.views.daily.map((d) => d.views), 1);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <LayoutDashboard className="w-5 h-5" /> {t('title')}
      </h1>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link
          href="/dashboard/products"
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow no-underline"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">{t('products')}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats.products.total}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{stats.products.active} {t('active')}</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50">
              <Package className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/contact"
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow no-underline"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">{t('messages')}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats.messages.total}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{stats.messages.thisMonth} {t('thisMonth')}</p>
            </div>
            <div className="p-2 rounded-lg bg-green-50">
              <Mail className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </Link>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">{t('siteViews')}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats.views.thisMonth}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{stats.views.today} {t('today')}</p>
            </div>
            <div className="p-2 rounded-lg bg-purple-50">
              <Eye className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">{t('weeklyViews')}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats.views.thisWeek}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{stats.views.total} {t('allTime')}</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-50">
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Views Chart + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-gray-400" /> {t('viewsLast7Days')}
          </h2>
          <div className="flex items-end gap-2 h-36">
            {stats.views.daily.map((day) => {
              const height = maxDailyViews > 0 ? (day.views / maxDailyViews) * 100 : 0;
              const dayLabel = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-gray-700">{day.views}</span>
                  <div className="w-full bg-gray-100 rounded-t-md relative" style={{ height: '100px' }}>
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-t-md transition-all"
                      style={{ height: `${Math.max(height, 2)}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{dayLabel}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-400" /> {t('mostViewedProducts')}
            </h2>
            <Link href="/dashboard/products" className="text-xs text-green-600 hover:underline flex items-center gap-1">
              {t('viewAll')} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {stats.views.topProducts.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">{t('noProductViews')}</p>
          ) : (
            <div className="space-y-3">
              {stats.views.topProducts.map((product, i) => (
                <div key={product.slug} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-bold text-gray-400 w-5">{i + 1}.</span>
                    <span className="text-sm text-gray-700 truncate">{product.name}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {product.views} {product.views === 1 ? t('view') : t('views')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Categories + Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" /> {t('productsByCategory')}
            </h2>
            <Link href="/dashboard/products" className="text-xs text-green-600 hover:underline flex items-center gap-1">
              {t('viewAll')} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {stats.products.categories.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">{t('noProducts')}</p>
          ) : (
            <div className="space-y-3">
              {stats.products.categories.map((cat) => (
                <div key={cat.category} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{cat.category}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.round((cat.count / stats.products.total) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-6 text-end">{cat.count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" /> {t('recentMessages')}
              {stats.messages.thisWeek > 0 && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  {stats.messages.thisWeek} {t('thisWeek')}
                </span>
              )}
            </h2>
            <Link href="/dashboard/contact" className="text-xs text-green-600 hover:underline flex items-center gap-1">
              {t('viewAll')} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {stats.messages.recent.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">{t('noMessages')}</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {stats.messages.recent.map((msg, i) => (
                <div key={i} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{msg.name}</p>
                      <p className="text-xs text-gray-500 truncate">{msg.subject}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ms-3">
                      {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
