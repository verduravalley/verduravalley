'use client';

import { usePageView } from '@/hooks/usePageView';
import { useTranslations } from 'next-intl';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import ShopMain from '@/components/marketing/main/ShopMain';

export default function ProductsPage() {
  usePageView('products');
  const t = useTranslations('breadcrumb');

  return (
    <>
      <BreadcrumbSection title={t('products')} />
      <ShopMain />
    </>
  );
}
