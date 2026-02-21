// Server Component — removed 'use client', improves FCP/LCP/SEO
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PageViewTracker from '@/components/marketing/utils/PageViewTracker';

// Above-fold: render immediately (no lazy load)
import BannerSection from '@/components/marketing/banner/BannerSection';

// Below-fold: lazy load to reduce initial JS/TBT
const MissionSection2 = dynamic(
  () => import('@/components/marketing/mission/MissionSection2'),
  { ssr: true }
);
const TeamSection = dynamic(
  () => import('@/components/marketing/team/TeamSection'),
  { ssr: true }
);
const MissionSection = dynamic(
  () => import('@/components/marketing/mission/MissionSection'),
  { ssr: true }
);
const ServiceSection = dynamic(
  () => import('@/components/marketing/service/ServiceSection'),
  { ssr: true }
);
const AboutSection = dynamic(
  () => import('@/components/marketing/about/AboutSection'),
  { ssr: true }
);
const ContactSection = dynamic(
  () => import('@/components/marketing/contact/ContactSection'),
  { ssr: true }
);

export default function HomePage() {
  return (
    <>
      {/* Fire-and-forget analytics — no render impact */}
      <PageViewTracker page="home" />

      {/* LCP element — rendered immediately */}
      <BannerSection />

      {/* Below-fold sections — code-split, streamed via Suspense */}
      <Suspense fallback={null}>
        <MissionSection2 />
        <TeamSection />
        <MissionSection />
        <ServiceSection />
        <AboutSection />
        <ContactSection />
      </Suspense>
    </>
  );
}
