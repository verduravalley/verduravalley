'use client';

import DivAnimateXAxis from "../utils/DivAnimateXAxis";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import IconIntegrity from "../utils/svg/IconIntegrity";
import IconRespect from "../utils/svg/IconRespect";
import IconSafe from "../utils/svg/IconSafe";
import IconStewardship from "../utils/svg/IconStewardship";
import { useTranslations } from "next-intl";
import CloudinaryImage from "@/components/CloudinaryImage";

const AboutSection2 = () => {
  const t = useTranslations('about');

  return (
    <section className="rv-1-about rv-section-spacing">
      <div className="container position-relative">
        <div className="row rv-1-about-row g-0 justify-content-between">
          {/* Left Side: Main Visual (The Modern Facility) */}
          <DivAnimateXAxis className="col-xl-4 col-lg-6" position={-80}>
            <div className="rv-1-about__img reveal">
              <CloudinaryImage src="/assets/img/about-img-1.jpg" alt="Verdura Valley Facility" width={600} height={600} />
            </div> 
          </DivAnimateXAxis> 

          {/* Right Side: The Narrative */}
          <DivAnimateXAxis className="col-xxl-6 col-xl-7 col-lg-6" position={80}>
            <div className="rv-1-about__txt">
              <div className="rv-1-section__heading">
                <div>
                  <h6 className="rv-1-section__sub-title rv-text-anime">
                    {t('storySubtitle')}
                  </h6>
                </div>
                <div>
                  <h2 className="rv-1-section__title rv-text-anime">
                    {t('storyTitle')}
                  </h2>
                </div>
              </div>

              <ul className="rv-1-about__pills">
                <li className="rv-1-about__pill">{t('heritage')}</li>
                <li className="rv-1-about__pill">{t('restoration')}</li>
                <li className="rv-1-about__pill">{t('innovation')}</li>
              </ul>

              <div className="rv-1-about__history">
                <p className="rv-1-about__descr">
                  <strong>Verdura Valley</strong> {t('descP1').replace('Verdura Valley is the evolution of a legacy. t', 't')}
                </p>
                <p className="rv-1-about__descr">
                  {t('descP2')}
                </p>
                <p className="rv-1-about__descr">
                  {t('descP3')}
                </p>
                <p className="rv-1-about__descr">
                  {t('descP4')}
                </p>
              </div>
            </div>
          </DivAnimateXAxis>
        </div>
      </div>

      {/* --- Our Vision (Full Width Background) --- */}
      <div className="rv-vision-bg" style={{ backgroundColor: '#e8f5e9', padding: '80px 0' }}>
        <div className="container">
          <DivAnimateYAxis>
            <div className="rv-vision-section text-center">
              <div className="rv-1-section__heading justify-content-center">
                <h6 className="rv-1-section__sub-title">{t('visionSubtitle')}</h6>
                <h2 className="rv-1-section__title">{t('visionTitle')}</h2>
              </div>
              <p className="rv-vision-descr mx-auto">
                {t('visionDesc')}
              </p>
            </div>
          </DivAnimateYAxis>
        </div>
      </div>

      <div className="container position-relative">
        {/* --- Our Philosophy / Core Values --- */}
        <div className="rv-philosophy-grid mt-100 mb-100">
          <div className="rv-1-section__heading mb-50">
            <h6 className="rv-1-section__sub-title">{t('philosophySubtitle')}</h6>
            <h2 className="rv-1-section__title">{t('philosophyTitle')}</h2>
          </div>

          <div className="row g-4">
            {[
              {
                title: t('stewardshipTitle'),
                icon: <IconStewardship />,
                desc: t('stewardshipDesc')
              },
              {
                title: t('qualityTitle'),
                icon: <IconSafe />,
                desc: t('qualityDesc')
              },
              {
                title: t('respectTitle'),
                icon: <IconRespect />,
                desc: t('respectDesc')
              },
              {
                title: t('integrityTitle'),
                icon: <IconIntegrity />,
                desc: t('integrityDesc')
              }
            ].map((value, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <DivAnimateYAxis duration={1 + (index * 0.1)}>
                  <div className="rv-value-card">
                    <div className="rv-value-card__icon">
                      {value.icon}
                    </div>
                    <h4 className="rv-value-card__title">{value.title}</h4>
                    <p className="rv-value-card__desc">{value.desc}</p>
                  </div>
                </DivAnimateYAxis>
              </div>
            ))}
          </div>
        </div>

        {/* The Memorial / Legacy Card */}
        <DivAnimateYAxis>
          <div className="rv-legacy-card mt-40 mb-40 w-100">
            <div className="d-flex align-items-start align-items-md-center gap-4 flex-column flex-md-row">
              <div className="rv-legacy-card__img-wrapper">
                <CloudinaryImage
                  src="/assets/images/medhat-marzouk.jpg"
                  alt={t('memorialName')}
                  className="rv-legacy-img"
                  width={300}
                  height={300}
                />
              </div>

              <div className="rv-legacy-card__txt">
                <span className="rv-legacy-tag">{t('memorialTag')}</span>
                <h4 className="rv-legacy-name">{t('memorialName')}</h4>
                <span className="rv-legacy-dates">{t('memorialDates')}</span>
                <p className="rv-legacy-desc">
                  {t('memorialDesc')}
                </p>
              </div>
            </div>
          </div>
        </DivAnimateYAxis>


        <div className="rv-1-about__vectors">
          <CloudinaryImage src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768434580/rv-1-vector-6_pk9i7z.png" alt="vector" className="rv-1-about__vector rv-1-about__vector-1" width={100} height={100} />
          <CloudinaryImage src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768434580/rv-1-vector-7_nmuwed.png" alt="vector" className="rv-1-about__vector rv-1-about__vector-2" width={100} height={100} />
          <CloudinaryImage src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768434581/rv-1-vector-8_k11vah.png" alt="vector" className="rv-1-about__vector rv-1-about__vector-3" width={100} height={100} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection2;
