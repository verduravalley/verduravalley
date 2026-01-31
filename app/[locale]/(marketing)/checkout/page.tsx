'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import CheckoutSection from '@/components/marketing/checkout/CheckoutSection';

export default function CheckoutPage() {
  return (
    <>
      <BreadcrumbSection title="Checkout" currentPage="Checkout" />
      <CheckoutSection />
    </>
  );
}
