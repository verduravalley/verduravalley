'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import TeamSection3 from '@/components/marketing/team/TeamSection3';
import { useTranslations } from "next-intl";
import CtaSection from '@/components/marketing/cta/CtaSection';

export default function LeadershipPage() {
  const t = useTranslations('breadcrumb');
  return (
    <>
      <BreadcrumbSection title={t('leadership')} />
      <TeamSection3 />
      {/* <CtaSection inner /> */}
    </>
  );
}
