'use client';

import { useTranslations, useLocale } from "next-intl";
import { stripDot } from "@/lib/stripDot";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const TermsOfServiceSection = () => {
  const t = useTranslations('termsOfServicePage');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const sections = [
    'intro', 'use', 'products', 'pricing', 'ip', 'liability', 'governing', 'changes', 'contact'
  ];

  return (
    <section className="rv-legal-section rv-section-spacing">
      <div className="container">
        <DivAnimateYAxis>
          <div className="rv-legal-content">
            <div className="rv-legal-header">
              {/* <h2 className="rv-legal-title">{t('title')}</h2> */}
              <p className="rv-legal-date">{t('lastUpdated')}</p>
            </div>

            <div className="rv-legal-body">
              {sections.map((sectionKey) => (
                <div className="rv-legal-block mb-40" key={sectionKey}>
                  <h3 className="rv-legal-block-title">{stripDot(t(`sections.${sectionKey}.title`), isAr)}</h3>
                  <p>{t(`sections.${sectionKey}.p1`)}</p>
                </div>
              ))}
            </div>
          </div>
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default TermsOfServiceSection;
 