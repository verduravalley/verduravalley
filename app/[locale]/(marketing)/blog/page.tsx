'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import AllBlogSection from '@/components/marketing/blog/AllBlogSection';

export default function BlogPage() {
  return (
    <>
      <BreadcrumbSection title="Blog" currentPage="Blog" />
      <AllBlogSection />
    </>
  );
}
