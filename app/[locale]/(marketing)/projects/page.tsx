import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/app/[locale]/layout';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import ProjectSection2 from '@/components/marketing/project/ProjectSection2';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: `Projects | ${t('title')}`,
    description: t('description'),
    alternates: { canonical: `${SITE_URL}/${locale}/projects` },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <BreadcrumbSection title="Our Projects" currentPage="Projects" />
      <ProjectSection2 />
    </>
  );
}
