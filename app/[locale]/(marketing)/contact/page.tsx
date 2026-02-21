import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/app/[locale]/layout';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import ContactSection2 from '@/components/marketing/contact/ContactSection2';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: `Contact Us | ${t('title')}`,
    description: t('description'),
    alternates: { canonical: `${SITE_URL}/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'breadcrumb' });
  return (
    <>
      <BreadcrumbSection title={t('contact')} />
      <ContactSection2 innerPage />
    </>
  );
}
