import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { ReduxProvider } from '@/store/provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { locales } from '@/i18n/config';
import { getTranslations } from 'next-intl/server';
import { Outfit, Cairo } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
  preload: false,
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const SITE_URL = 'https://verduravalley.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        'en': `${SITE_URL}/en`,
        'ar': `${SITE_URL}/ar`,
        'x-default': `${SITE_URL}/en`,
      },
    },
    icons: {
      icon: 'https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768251099/organiyo/Logos/Verdura%20Valley%20White%20Background.png',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}`,
      siteName: 'Verdura Valley',
      locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar'
    ? `${cairo.variable} ${outfit.variable}`
    : `${outfit.variable} ${cairo.variable}`;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={fontClass}>
      <head>
        <link rel="icon" href="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768251104/organiyo/Logos/Verdura-Valley.png" />
        {/* Bootstrap: layout-critical — must load synchronously */}
        {dir === 'rtl' ? (
          <link rel="stylesheet" href="/css/bootstrap.rtl.min.css" />
        ) : (
          <link rel="stylesheet" href="/css/bootstrap.min.css" />
        )}
        {/* LCP preload handled automatically by <Image priority> in BannerStaticFallback */}
        {/* FontAwesome: all kits loaded synchronously for reliable icon display across all pages */}
        <link rel="stylesheet" href="/assets/fontawesome/all.min.css" />
        <link rel="stylesheet" href="/assets/fontawesome/sharp-solid.min.css" />
        <link rel="stylesheet" href="/assets/fontawesome/sharp-regular.min.css" />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ReduxProvider>
            {children}
            <ToastContainer position={dir === 'rtl' ? 'top-left' : 'top-right'} autoClose={3000} />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
