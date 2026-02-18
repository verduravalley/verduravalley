'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { LayoutDashboard, Package, Users, FileText, Mail, ShoppingBag, LogOut, Globe, Menu, X } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/dashboard', labelKey: 'overview', icon: LayoutDashboard },
  { href: '/dashboard/products', labelKey: 'products', icon: Package },
  { href: '/dashboard/leadership', labelKey: 'leadership', icon: Users },
  { href: '/dashboard/code-of-conduct', labelKey: 'codeOfConduct', icon: FileText },
  { href: '/dashboard/contact', labelKey: 'messages', icon: Mail },
  { href: '/dashboard/custom-requests', labelKey: 'customRequests', icon: ShoppingBag },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('dashboard.sidebar');
  const tc = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/dashboard';
    router.replace(pathWithoutLocale, { locale: newLocale });
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 start-4 z-[60] bg-green-600 text-white p-2 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[60]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'w-64 bg-slate-900 text-white flex flex-col h-screen fixed start-0 top-0 z-[70] overflow-y-auto transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-green-400">{t('adminTitle')}</h1>
            <p className="text-xs text-slate-400 mt-1">{t('console')}</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, '');
            const isActive = pathnameWithoutLocale === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                )}
              >
                <item.icon className="w-5 h-5 me-3" />
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={switchLocale}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Globe className="w-5 h-5 me-3" />
            {tc('switchLang')}
          </button>
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              router.push('/sign-in');
            }}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 me-3" />
            {t('signOut')}
          </button>
        </div>
      </aside>
    </>
  );
}
