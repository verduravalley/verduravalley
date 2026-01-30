'use client';

import Link from 'next/link';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import DivAnimateYAxis from '@/components/marketing/utils/DivAnimateYAxis';
import IconQuality from '@/components/marketing/utils/svg/IconQuality';
import IconFood from '@/components/marketing/utils/svg/IconFood';
import IconWater from '@/components/marketing/utils/svg/IconWater';
import IconClimate from '@/components/marketing/utils/svg/IconClimate';
import IconDependency from '@/components/marketing/utils/svg/IconDependency';
import IconClean from '@/components/marketing/utils/svg/IconClean';

const sustainabilityPillars = [
  {
    id: 1,
    title: 'Sustainability & Quality',
    description: 'At Verdura Valley, sustainability and quality are not initiatives - they are built into how we operate every day. From production planning to post-harvest handling, our systems are designed to protect resources, ensure food safety, and deliver consistent, high-quality produce to hospitality and export markets.',
    icon: IconQuality,
    slug: 'sustainability-quality',
  },
  {
    id: 2,
    title: 'Food Safety',
    description: 'Food safety is a core operational priority at Verdura Valley. Even prior to formal certifications, we implement disciplined food safety practices across our facilities, including controlled access, structured workflows, and documented handling procedures. Our goal is to build systems that meet international standards through practice, not just compliance.',
    icon: IconFood,
    slug: 'food-safety',
  },
  {
    id: 3,
    title: 'Water Usage',
    description: 'Operating in a water-scarce environment, we design our farming systems to maximize water efficiency. Through hydroponics, controlled irrigation, and monitoring of water use, we significantly reduce waste while maintaining crop health and yield. Responsible water management is fundamental to our long-term sustainability.',
    icon: IconWater,
    slug: 'water-usage',
  },
  {
    id: 4,
    title: 'Climate-Control',
    description: 'We utilize climate-controlled production environments where appropriate to optimize growing conditions, improve consistency, and reduce external environmental stress. These systems allow for stable production year-round while supporting quality, efficiency, and resource conservation.',
    icon: IconClimate,
    slug: 'climate-control',
  },
  {
    id: 5,
    title: 'Reduced Pesticides',
    description: 'Our production approach prioritizes prevention, control, and system design to minimize the need for chemical pesticides. By combining controlled environments, monitoring, and good agricultural practices, we aim to reduce pesticide dependency while protecting crop integrity and consumer health.',
    icon: IconDependency,
    slug: 'reduced-pesticides',
  },
  {
    id: 6,
    title: 'Hygiene Standards',
    description: 'We maintain strict cleanliness and hygiene practices across all stages of production, handling, and packaging to protect product quality, food safety, and the health of our team and customers.',
    icon: IconClean,
    slug: 'hygiene-standards',
  },
];

const SustainabilityGovernancePage = () => {
  return (
    <main className="rv-14-body">
      <BreadcrumbSection title="Sustainability & Governance" />

      {/* Hero Section */}
      <section className="rv-section-spacing" style={{ backgroundColor: '#e8f5e9' }}>
        <div className="container">
          <div className="rv-vision-section text-center ">
            <h2 className="rv-1-section__title" style={{ fontSize: '2.7rem', marginBottom: '4rem', color: '#1b5e20' }}>Built to Grow Responsibly</h2>
            <div className="rv-1-section__heading justify-content-center">
            </div>
            <p className="rv-vision-descr mx-auto">
              Verdura Valley is built to grow responsibly - delivering healthy food through systems
              designed for consistency, care, and long-term impact.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section (Pillars of Impact) */}
      <section className="rv-14-services rv-section-spacing">
        <div className="container">
          <div className="rv-section-title text-center mb-50">
            <h2 className="rv-section-title__title rv-text-anime">Pillars of Impact</h2>
          </div>

          <div className="row g-0 row-cols-md-3 row-cols-2 row-cols-xxs-1 overflow-hidden">
            {sustainabilityPillars.map((item) => (
              <DivAnimateYAxis
                className="col d-flex"
                key={item.id}
                duration={1.2 + 0.05 * item.id}
              >
                <div className="rv-14-service rv-inner-service custom-pillar-card">
                  <div className="rv-14-service__icon">
                    {item.icon && <item.icon />}
                  </div>

                  <div className="content-wrapper">
                    <h4 className="rv-14-service__title">
                      <Link href="#">{item.title}</Link>
                    </h4>
                    <p className="rv-3-service__descr">{item.description}</p>
                  </div>
                </div>
              </DivAnimateYAxis>
            ))}
          </div>
        </div>
      </section>

      <section className="rv-section-spacing" style={{ backgroundColor: '#e8f5e9' }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="rv-vision-section text-center">
              <h2 className="rv-1-section__title" style={{ fontSize: '2.7rem', marginBottom: '4rem', color: '#1b5e20' }}>Verdura Valley&apos;s Approach</h2>
              <div className="rv-1-section__heading justify-content-center">
              </div>
              <p className="rv-vision-descr mx-auto">
                Sustainability and quality at Verdura Valley are practical, measurable, and continuously improved. As we grow, our systems are designed to scale responsibly while maintaining the standards expected by restaurants, hotels, and international markets.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SustainabilityGovernancePage;
