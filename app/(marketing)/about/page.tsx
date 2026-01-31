'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import AboutSection2 from '@/components/marketing/about/AboutSection2';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('breadcrumb');
  return (
    <>
      <BreadcrumbSection title={t('about')} currentPage={t('aboutUs')} />
      <AboutSection2 />
    </>
  );
}
