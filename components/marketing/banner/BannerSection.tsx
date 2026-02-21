'use client';

import { useEffect, useState } from "react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations, useLocale } from "next-intl";

// GSAP + SplitType lazy-loaded on slide change — not in initial bundle (~150KB saved)
const animateSlideText = async (swiper: any, isRTL: boolean) => {
  const gsapMod = await import('gsap');
  const splitMod = await import('split-type');
  // Handle both ESM default and CJS module.exports shapes
  const gsap = gsapMod.default ?? gsapMod;
  const SplitType = (splitMod.default ?? splitMod) as any;

  const currentSlide = swiper.slides[swiper.activeIndex];
  const textsToAnimate = currentSlide.querySelectorAll(".rv-text-anime");
  textsToAnimate.forEach((textToAnimate: HTMLElement) => {
    if (isRTL && (
      textToAnimate.classList.contains('rv-20-banner_content_heading') ||
      textToAnimate.classList.contains('rv-20-banner_content_sub_heading')
    )) return;

    const animate = new SplitType(textToAnimate, { types: "words,chars" });
    gsap.from(animate.chars, {
      opacity: 0,
      x: isRTL ? -100 : 100,
      duration: 1.1,
      stagger: { amount: 0.9 },
    });
  });
};

const BannerSection = () => {
  const t = useTranslations('banner');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    if (swiper) {
      swiper.on("slideChange", () => animateSlideText(swiper, isRTL));
    }
  }, [swiper, isRTL]);

  return (
    <section className="rv-20-banner_section">
      <Swiper
        autoplay={true}
        loop={true}
        effect="fade"
        navigation={{
          nextEl: ".rv-20-banner_slide_button_next",
          prevEl: ".rv-20-banner_slide_button_prev",
        }}
        modules={[EffectFade, Navigation, Autoplay]}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        <SwiperSlide className="rv-20-banner_slide">
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
};

export default BannerSection;
