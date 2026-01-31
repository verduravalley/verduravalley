'use client';

import { useEffect, useState } from "react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import SplitType from "split-type";
import { useTranslations, useLocale } from "next-intl";

const BannerSection = () => {
  const t = useTranslations('banner');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    if (swiper) {
      swiper.on("slideChange", () => {
        const currentSlide = swiper.slides[swiper.activeIndex];
        const textsToAnimate = currentSlide.querySelectorAll(".rv-text-anime");
        textsToAnimate.forEach((textToAnimate: HTMLElement) => {
          // Skip SplitType animation for Arabic text to preserve text integrity
          if (isRTL && (textToAnimate.classList.contains('rv-20-banner_content_heading') || 
                        textToAnimate.classList.contains('rv-20-banner_content_sub_heading'))) {
            return;
          }
          const animate = new SplitType(textToAnimate, {
            types: "words,chars",
          });
          gsap.from(animate.chars, {
            opacity: 0,
            x: isRTL ? -100 : 100,
            duration: 1.1,
            stagger: { amount: 0.9 },
          });
        });
      });
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
                    <span></span> {t('slide1Sub')}
                  </span>
                  <h1 className="rv-20-banner_content_heading rv-text-anime">
                    {t('slide1Heading')}
                  </h1>

                  <div className="rv-20-banner_button_area">
                    <a href="#" className="rv-20-banner_content_btn">
                      {t('exploreMore')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="rv-20-banner_slide rv-20-banner_slide-2 ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-sm-10 col-md-9 col-lg-8 col-xl-7">
                <div className="rv-20-banner_content">
                  <span className="rv-20-banner_content_sub_heading rv-text-anime">
                    <span></span> {t('slide2Sub')}
                  </span>
                  <h1 className="rv-20-banner_content_heading rv-text-anime">
                    {t('slide2Heading')}
                  </h1>
                  <div className="rv-20-banner_button_area">
                    <a href="#" className="rv-20-banner_content_btn">
                      {t('exploreMore')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="rv-20-banner_slide_button_area">
        <div className="rv-20-banner_slide_button_prev">
          {" "}
          <i className={`fas fa-arrow-${isRTL ? 'right' : 'left'}`}></i>{" "}
        </div>
        <div className="rv-20-banner_slide_button_next">
          {" "}
          <i className={`fas fa-arrow-${isRTL ? 'left' : 'right'}`}></i>{" "}
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
