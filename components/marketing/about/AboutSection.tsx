'use client';

import { useTranslations } from "next-intl";
import NumberCounter from "../utils/NumberCounter";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import CloudinaryImage from "@/components/CloudinaryImage";

const AboutSection = () => {
  const t = useTranslations('home.about');
  const t2 = useTranslations('about');

  return (
    <section className="rv-20-about_section">
      <div className="container">
        <DivAnimateYAxis className="row justify-content-center">
          <div className="col-md-12 col-lg-10 col-xl-9">
            <div className="rv-20-about_section_content text-center">

              {/* Heading Section */}
              <div className="rv-20-about_section_heading">
                <div className="d-flex justify-content-center">
                  {/* <p className="rv-20-about_sub_title rv-text-anime d-flex">
                    <span></span> {t('subtitle')}
                  </p> */}
                </div>
                <div>
                  <h2 className="rv-20-about_section_title rv-text-anime">
                    {t('title')}
                  </h2>
                </div>
              </div>

              {/* Experience Counter */}
              {/* <div className="rv-20-about_experience_txt mb-50" style={{ margin: '0 auto', display: 'inline-block' }}>
                <NumberCounter
                  number={3}
                  initialNumber={1}
                  durationToComplete={2}
                  icon="+"
                />
                <p>{t('counterLabel')}</p>
              </div> */}

              {/* Mission and Goals Row */}
              <div className="rv-20-about_content_top_actions d-flex justify-content-center flex-wrap">
                {/* <div className="rv-20-about_content_single_top_actions text-start">
                  <div className="rv-20-about_content_single_top_actions_left">
                    <h3>{t('missionTitle')}</h3>
                    <p>{t('missionDesc')}</p>
                  </div>
                  <div className="rv-20-about_content_single_top_actions_icon">
                    <i className="fas fa-leaf" style={{ color: "#2D6A4F" }}></i>
                  </div>
                </div> */}

                {/* <div className="rv-20-about_content_single_top_actions text-start">
                  <div className="rv-20-about_content_single_top_actions_left">
                    <h3>{t('artisanTitle')}</h3>
                    <p>{t('artisanDesc')}</p>
                  </div>
                  <div className="rv-20-about_content_single_top_actions_icon">
                    <i className="fas fa-award" style={{ color: "#2D6A4F" }}></i>
                  </div>
                </div> */}
              </div>

              {/* Detail List */}
              <div className="rv-20-about_list mt-40">
                <ul className="row">
                  <li className="col-md-6 text-start">
                    <h4>
                      <i className="far fa-chevron-double-right"></i>{t2('stewardshipTitle')}
                    </h4>
                    <p>{t2('stewardshipDesc')}</p>
                  </li>

                  <li className="col-md-6 text-start">
                    <h4>
                      <i className="far fa-chevron-double-right"></i>{t2('qualityTitle')}
                    </h4>
                    <p>{t2('qualityDesc')}</p>
                  </li>

                  <li className="col-md-6 text-start">
                    <h4>
                      <i className="far fa-chevron-double-right"></i>{t2('respectTitle')}
                    </h4>
                    <p>{t2('respectDesc')}</p>
                  </li>

                  <li className="col-md-6 text-start">
                    <h4>
                      <i className="far fa-chevron-double-right"></i>{t2('integrityTitle')}
                    </h4>
                    <p>{t2('integrityDesc')}</p>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </DivAnimateYAxis>
      </div>

      <span className="about-sh-6">
        <CloudinaryImage src="/assets/img/about/home-6-about-3.png" alt="decorative shape" width={200} height={200} />
      </span>
    </section>
  );
};

export default AboutSection;
