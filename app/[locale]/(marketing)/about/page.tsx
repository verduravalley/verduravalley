'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import AboutSection2 from '@/components/marketing/about/AboutSection2';

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSection title="About" currentPage="About Us" />
      <AboutSection2 />
    </>
  );
}
