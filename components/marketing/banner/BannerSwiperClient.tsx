'use client';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import { useEffect, useState } from 'react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

const HERO_URL =
  'https://res.cloudinary.com/dh1mv7xlv/image/upload/v1771448404/pexels-zeynep-sude-emek-193601188-20315537_oaktwr.jpg';

const animateSlideText = async (swiper: any, isRTL: boolean) => {
  const gsapMod = await import('gsap');
  const splitMod = await import('split-type');
  const gsap = gsapMod.default ?? gsapMod;
  const SplitType = (splitMod.default ?? splitMod) as any;

  const currentSlide = swiper.slides[swiper.activeIndex];
  const textsToAnimate = currentSlide.querySelectorAll('.rv-text-anime');
  textsToAnimate.forEach((textToAnimate: HTMLElement) => {
    if (
      isRTL &&
      (textToAnimate.classList.contains('rv-20-banner_content_heading') ||
        textToAnimate.classList.contains('rv-20-banner_content_sub_heading'))
    )
      return;

    const animate = new SplitType(textToAnimate, { types: 'words,chars' });
    gsap.from(animate.chars, {
      opacity: 0,
      x: isRTL ? -100 : 100,
      duration: 1.1,
      stagger: { amount: 0.9 },
    });
  });
};

export default function BannerSwiperClient() {
  const t = useTranslations('banner');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => animateSlideText(swiper, isRTL));
    }
  }, [swiper, isRTL]);

  return (
    <section className="rv-20-banner_section">
      <Swiper
        autoplay={true}
        loop={true}
        effect="fade"
        navigation={{
          nextEl: '.rv-20-banner_slide_button_next',
          prevEl: '.rv-20-banner_slide_button_prev',
        }}
        modules={[EffectFade, Navigation, Autoplay]}
        onSwiper={(s) => setSwiper(s)}
      >
        <SwiperSlide
          className="rv-20-banner_slide"
          style={{ backgroundImage: 'none', position: 'relative', overflow: 'hidden' }}
        >
          <Image
            src={HERO_URL}
            alt=""
            priority
            width={1920}
            height={800}
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
                    <span className="rv-20-banner_content_sub_heading rv-text-anime d-flex">
                      {t('slide1Sub')}
                    </span>
                    <h1 className="rv-20-banner_content_heading rv-text-anime">
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
        </SwiperSlide>

        <SwiperSlide className="rv-20-banner_slide rv-20-banner_slide-2">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-sm-10 col-md-9 col-lg-8 col-xl-7">
                <div className="rv-20-banner_content">
                  <span className="rv-20-banner_content_sub_heading rv-text-anime">
                    {t('slide2Sub')}
                  </span>
                  <h1 className="rv-20-banner_content_heading rv-text-anime">
                    {t('slide2Heading')}
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
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
