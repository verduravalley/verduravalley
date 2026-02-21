import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/app/[locale]/layout';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import AboutSection2 from '@/components/marketing/about/AboutSection2';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: `About Us | ${t('title')}`,
    description: t('description'),
    alternates: { canonical: `${SITE_URL}/${locale}/about` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'breadcrumb' });
  return (
    <>
      <BreadcrumbSection title={t('about')} currentPage={t('aboutUs')} />
      <AboutSection2 />
    </>
  );
}
