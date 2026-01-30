'use client';

import { usePageView } from '@/hooks/usePageView';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import ShopMain from '@/components/marketing/main/ShopMain';

export default function ProductsPage() {
  usePageView('products');

  return (
    <>
      <BreadcrumbSection title="Products" />
      <ShopMain />
    </>
  );
}
