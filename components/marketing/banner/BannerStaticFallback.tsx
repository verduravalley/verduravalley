'use client';

import { useTranslations } from 'next-intl';
import HeroPicture from './HeroPicture';

export default function BannerStaticFallback() {
  const t = useTranslations('banner');
  return (
    <section className="rv-20-banner_section">
      <div
        className="rv-20-banner_slide"
        style={{ backgroundImage: 'none', position: 'relative', overflow: 'hidden' }}
      >
        <HeroPicture />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-sm-10 col-md-9 col-lg-8 col-xl-7">
                <div className="rv-20-banner_content">
                  <span className="rv-20-banner_content_sub_heading d-flex">
                    {t('slide1Sub')}
                  </span>
                  <h1 className="rv-20-banner_content_heading">
                    {t('slide1Heading')}
                  </h1>
                  <div className="rv-20-banner_button_area">
                    <a href="/products" className="rv-20-banner_content_btn">
                      {t('exploreMore')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
