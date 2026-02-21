import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/app/[locale]/layout';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import AllBlogSection from '@/components/marketing/blog/AllBlogSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: `Blog | ${t('title')}`,
    description: t('description'),
    alternates: { canonical: `${SITE_URL}/${locale}/blog` },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <BreadcrumbSection title="Blog" currentPage="Blog" />
      <AllBlogSection />
    </>
  );
}
