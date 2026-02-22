'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import DivAnimateYAxis from '@/components/marketing/utils/DivAnimateYAxis';
import IconQuality from '@/components/marketing/utils/svg/IconQuality';
import IconFood from '@/components/marketing/utils/svg/IconFood';
import IconWater from '@/components/marketing/utils/svg/IconWater';
import IconClimate from '@/components/marketing/utils/svg/IconClimate';
import IconDependency from '@/components/marketing/utils/svg/IconDependency';
import IconClean from '@/components/marketing/utils/svg/IconClean';

const pillarIcons = [IconQuality, IconFood, IconWater, IconClimate, IconDependency, IconClean];

const SustainabilityGovernancePage = () => {
  const t = useTranslations('sustainabilityPage');

  const pillars = pillarIcons.map((icon, i) => ({
    id: i + 1,
    title: t(`pillar${i + 1}Title` as any),
    description: t(`pillar${i + 1}Desc` as any),
    icon,
  }));

  return (
    <main className="rv-14-body">
      <BreadcrumbSection title={t('title')} />

      {/* Hero Title */}
      <section className="rv-section-spacing pb-3" style={{ paddingTop: 10 }}>
        <div className="container">
          <h2 className="rv-hero-title text-center p-0 m-0">{t('heroTitle')}</h2>
        </div>
      </section>

      {/* Hero Description */}
      <section className="w-100 p-4" style={{ backgroundColor: '#e8f5e9' }}>
        <div className="container">
          <div className="rv-vision-section text-center">
            <div className="rv-1-section__heading justify-content-center">
              <p className="rv-vision-descr mx-auto">
                {t('heroDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section (Pillars of Impact) */}
      <section className="rv-14-services rv-section-spacing">
        <div className="container">
          <div className="rv-section-title text-center mb-50">
            <h2 className="rv-section-title__title rv-text-anime">{t('pillarsTitle')}</h2>
          </div>

          <div className="row g-0 row-cols-md-3 row-cols-2 row-cols-xxs-1 overflow-hidden">
            {pillars.map((item) => (
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

      {/* <section className="rv-section-spacing" style={{ backgroundColor: '#e8f5e9' }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="rv-vision-section text-center">
              <h2 className="rv-1-section__title" style={{ fontSize: '2.7rem', marginBottom: '4rem', color: '#1b5e20' }}>{t('approachTitle')}</h2>
              <div className="rv-1-section__heading justify-content-center">
              </div>
              <p className="rv-vision-descr mx-auto">
                {t('approachDesc')}
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default SustainabilityGovernancePage;
