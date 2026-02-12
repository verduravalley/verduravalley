'use client';

import { useTranslations } from 'next-intl';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';

const sections = [
  'intro', 'use', 'products', 'pricing', 'ip', 'liability', 'governing', 'changes', 'contact'
] as const;

const TermsOfServicePage = () => {
  const t = useTranslations('termsOfServicePage');

  return (
    <main className="rv-14-body">
      <BreadcrumbSection title={t('title')} />

      <section className="rv-section-spacing">
        <div className="container" style={{ maxWidth: '900px' }}>
          <p className="text-muted mb-5 text-center">{t('lastUpdated')}</p>

          {sections.map((key) => (
            <div key={key} className="mb-5">
              <h3 className="rv-legal-section__title">{t(`${key}Title`)}</h3>
              <p className="rv-legal-section__desc">{t(`${key}Desc`)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TermsOfServicePage;
