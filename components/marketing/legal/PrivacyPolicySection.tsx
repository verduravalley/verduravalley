'use client';

import { useTranslations } from "next-intl";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const PrivacyPolicySection = () => {
  const t = useTranslations('privacyPolicyPage');

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
              <p className="rv-legal-intro mb-30">{t('intro')}</p>

              <div className="rv-legal-block mt-4">
                <h3 className="rv-legal-block-title">{t('sections.s1.title')}</h3>
                <p>{t('sections.s1.intro')}</p>
                
                <div className="rv-legal-sub-block mt-20">
                  <h4 className="rv-legal-sub-title">{t('sections.s1.aLabel')}</h4>
                  <ul className="rv-legal-list">
                    <li>{t('sections.s1.al1')}</li>
                    <li>{t('sections.s1.al2')}</li>
                    <li>{t('sections.s1.al3')}</li>
                    <li>{t('sections.s1.al4')}</li>
                    <li>{t('sections.s1.al5')}</li>
                  </ul>
                </div>

                <div className="rv-legal-sub-block mt-20">
                  <h4 className="rv-legal-sub-title">{t('sections.s1.bLabel')}</h4>
                  <ul className="rv-legal-list">
                    <li>{t('sections.s1.bl1')}</li>
                    <li>{t('sections.s1.bl2')}</li>
                    <li>{t('sections.s1.bl3')}</li>
                    <li>{t('sections.s1.bl4')}</li>
                    <li>{t('sections.s1.bl5')}</li>
                  </ul>
                </div>
              </div>

              <div className="rv-legal-block mt-40">
                <h3 className="rv-legal-block-title">{t('sections.s2.title')}</h3>
                <p>{t('sections.s2.intro')}</p>
                <ul className="rv-legal-list mt-10">
                  <li>{t('sections.s2.l1')}</li>
                  <li>{t('sections.s2.l2')}</li>
                  <li>{t('sections.s2.l3')}</li>
                  <li>{t('sections.s2.l4')}</li>
                  <li>{t('sections.s2.l5')}</li>
                </ul>
                <p className="mt-15"><strong>{t('sections.s2.outro')}</strong></p>
              </div>

              <div className="rv-legal-block mt-40">
                <h3 className="rv-legal-block-title">{t('sections.s3.title')}</h3>
                <p>{t('sections.s3.p1')}</p>
                <p className="mt-10">{t('sections.s3.p2')}</p>
              </div>

              <div className="rv-legal-block mt-40">
                <h3 className="rv-legal-block-title">{t('sections.s4.title')}</h3>
                <p>{t('sections.s4.intro')}</p>
                <ul className="rv-legal-list mt-10">
                  <li>{t('sections.s4.l1')}</li>
                  <li>{t('sections.s4.l2')}</li>
                  <li>{t('sections.s4.l3')}</li>
                </ul>
              </div>

              <div className="rv-legal-block mt-40">
                <h3 className="rv-legal-block-title">{t('sections.s5.title')}</h3>
                <p>{t('sections.s5.p1')}</p>
                <p className="mt-10">{t('sections.s5.p2')}</p>
              </div>

              <div className="rv-legal-block mt-40">
                <h3 className="rv-legal-block-title">{t('sections.s6.title')}</h3>
                <p>{t('sections.s6.p1')}</p>
              </div>

              <div className="rv-legal-block mt-40">
                <h3 className="rv-legal-block-title">{t('sections.s7.title')}</h3>
                <p>{t('sections.s7.intro')}</p>
                <ul className="rv-legal-list mt-10">
                  <li>{t('sections.s7.l1')}</li>
                  <li>{t('sections.s7.l2')}</li>
                  <li>{t('sections.s7.l3')}</li>
                </ul>
                <p className="mt-15">{t('sections.s7.outro')}</p>
              </div>

              <div className="rv-legal-block mt-40">
                <h3 className="rv-legal-block-title">{t('sections.s8.title')}</h3>
                <p>{t('sections.s8.p1')}</p>
              </div>

              <div className="rv-legal-block mt-40">
                <h3 className="rv-legal-block-title">{t('sections.s9.title')}</h3>
                <p>{t('sections.s9.p1')}</p>
              </div>

              <div className="rv-legal-block mt-40">
                <h3 className="rv-legal-block-title">{t('sections.s10.title')}</h3>
                <p>{t('sections.s10.p1')}</p>
                <p className="mt-10"><strong>{t('sections.s10.email')}</strong></p>
              </div>
            </div>
          </div>
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default PrivacyPolicySection;
