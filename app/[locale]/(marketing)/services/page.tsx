'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import ServiceSection2 from '@/components/marketing/service/ServiceSection2';

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSection title="Our Services" currentPage="Services" />
      <ServiceSection2 />
    </>
  );
}
