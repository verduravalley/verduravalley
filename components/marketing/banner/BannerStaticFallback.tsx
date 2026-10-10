'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const HERO_URL = '/assets/images/hero-fresh-mushrooms.jpg';

export default function BannerStaticFallback() {
  const t = useTranslations('banner');
  return (
    <section className="rv-20-banner_section">
      <div
        className="rv-20-banner_slide"
        style={{ backgroundImage: 'none', position: 'relative', overflow: 'hidden' }}
      >
        <Image
          src={HERO_URL}
          alt=""
          priority
          width={1920}
          height={800}
          fetchPriority="high"
          sizes="100vw"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
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
