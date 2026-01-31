'use client';

import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import ProjectSection2 from '@/components/marketing/project/ProjectSection2';

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbSection title="Our Projects" currentPage="Projects" />
      <ProjectSection2 />
    </>
  );
}
