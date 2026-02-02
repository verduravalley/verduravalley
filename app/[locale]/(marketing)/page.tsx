'use client';

import { usePageView } from '@/hooks/usePageView';
import BannerSection from '@/components/marketing/banner/BannerSection';
import TeamSection from '@/components/marketing/team/TeamSection';
import MissionSection from '@/components/marketing/mission/MissionSection';
import AboutSection from '@/components/marketing/about/AboutSection';
import ServiceSection from '@/components/marketing/service/ServiceSection';
import ContactSection from '@/components/marketing/contact/ContactSection';

export default function HomePage() {
  usePageView('home');

  return (
    <>
      <BannerSection />
      <TeamSection />
      <MissionSection />
      <ServiceSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
