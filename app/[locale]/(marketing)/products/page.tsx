import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/app/[locale]/layout';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import ShopMain from '@/components/marketing/main/ShopMain';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: `Products | ${t('title')}`,
    description: t('description'),
    alternates: { canonical: `${SITE_URL}/${locale}/products` },
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'breadcrumb' });
  return (
    <>
      <BreadcrumbSection title={t('products')} />
      <ShopMain />
    </>
  );
}
