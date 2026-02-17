'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import PrivacyPolicySection from '@/components/marketing/legal/PrivacyPolicySection';
import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations('breadcrumb');
  const tLegal = useTranslations('privacyPolicyPage');

  return (
    <>
      <BreadcrumbSection title={tLegal('title')} currentPage={t('privacyPolicy')} />
      <PrivacyPolicySection />
    </>
  );
}
