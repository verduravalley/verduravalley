'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import WishlistSection from '@/components/marketing/wishlist/WishlistSection';

export default function WishlistPage() {
  return (
    <>
      <BreadcrumbSection title="Wishlist" currentPage="Wishlist" />
      <WishlistSection />
    </>
  );
}
