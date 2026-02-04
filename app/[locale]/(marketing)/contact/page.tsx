'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import ContactSection2 from '@/components/marketing/contact/ContactSection2';

export default function ContactPage() {
  const t = useTranslations('breadcrumb');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BreadcrumbSection title={t('contact')} />
      <ContactSection2 innerPage />
    </>
  );
}
