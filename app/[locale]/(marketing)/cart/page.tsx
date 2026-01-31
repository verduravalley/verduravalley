'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import CartSection from '@/components/marketing/cart/CartSection';

export default function CartPage() {
  return (
    <>
      <BreadcrumbSection title="Shopping Cart" currentPage="Cart" />
      <CartSection />
    </>
  );
}
