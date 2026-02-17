'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import TermsOfServiceSection from '@/components/marketing/legal/TermsOfServiceSection';
import { useTranslations } from "next-intl";

export default function TermsOfServicePage() {
  const t = useTranslations('breadcrumb');
  const tLegal = useTranslations('termsOfServicePage');

  return (
    <>
      <BreadcrumbSection title={tLegal('title')} currentPage={t('termsOfService')} />
      <TermsOfServiceSection />
    </>
  );
}

