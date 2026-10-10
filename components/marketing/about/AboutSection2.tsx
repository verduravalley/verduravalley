"use client";

import DivAnimateXAxis from "../utils/DivAnimateXAxis";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import IconRespect from "../utils/svg/IconRespect";
import IconSafe from "../utils/svg/IconIntegrity";
import IconStewardship from "../utils/svg/IconStewardship";
import IconQuality from "../utils/svg/IconQuality";
import { useTranslations, useLocale } from "next-intl";
import { stripDot } from "@/lib/stripDot";
import CloudinaryImage from "@/components/CloudinaryImage";

const AboutSection2 = () => {
  const t = useTranslations("about");
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section
      className="rv-1-about rv-section-spacing"
      style={{ paddingTop: 10 }}
    >
      <div className="container position-relative">
        <div className="row rv-1-about-row g-0 justify-content-between">
          {/* Left Side: Main Visual (The Modern Facility) */}
          <DivAnimateXAxis className="col-xl-4 col-lg-6" position={-80}>
            <div className="rv-1-about__img reveal">
              <CloudinaryImage
                src="/assets/images/about-facility.png"
                alt="Verdura Valley Facility"
                width={600}
                height={600}
              />
            </div>
          </DivAnimateXAxis>

          {/* Right Side: The Narrative */}
          <DivAnimateXAxis
            className="col-xxl-6 col-xl-7 col-lg-6"
            position={80}
          >
            <div className="rv-1-about__txt">
              <div className="rv-1-section__heading">
                <div>
                  {/* <h6 className="rv-1-section__sub-title rv-text-anime">
                    {t('storySubtitle')}
                  </h6> */}
                </div>
                <div>
                  <h2 className="rv-1-section__title rv-text-anime">
                    {stripDot(t("storyTitle"), isAr)}
                  </h2>
                </div>
              </div>

              <ul className="rv-1-about__pills">
                <li className="rv-1-about__pill">{t("heritage")}</li>
                <li className="rv-1-about__pill">{t("restoration")}</li>
                <li className="rv-1-about__pill">{t("innovation")}</li>
              </ul>

              <div className="rv-1-about__history">
                <p className="rv-1-about__descr">
                  <strong>Verdura Valley</strong>{" "}
                  {t("descP1").replace(
                    "Verdura Valley is the evolution of a legacy. t",
                    "t",
                  )}
                </p>
                <p className="rv-1-about__descr">{t("descP2")}</p>
                <p className="rv-1-about__descr">{t("descP3")}</p>
                <p className="rv-1-about__descr">{t("descP4")}</p>
              </div>
            </div>
          </DivAnimateXAxis>
        </div>
      </div>

      {/* The Memorial / Legacy Card */}
      <DivAnimateYAxis>
        <div className="rv-legacy-card mb-80 w-75 mx-auto">
          <div className="d-flex align-items-start align-items-md-center gap-4 flex-column flex-md-row">
            <div className="rv-legacy-card__img-wrapper">
              <CloudinaryImage
                src="/assets/images/medhat-marzouk.jpg"
                alt={t("memorialName")}
                className="rv-legacy-img"
                width={300}
                height={300}
              />
            </div>

            <div className="rv-legacy-card__txt">
              <span className="rv-legacy-tag">{t("memorialTag")}</span>
              <h4 className="rv-legacy-name">{t("memorialName")}</h4>
              <span className="rv-legacy-dates">{t("memorialDates")}</span>
              <p className="rv-legacy-desc">{t("memorialDesc")}</p>
            </div>
          </div>
        </div>
      </DivAnimateYAxis>

      {/* --- Our Vision (Full Width Background) --- */}
      <div
        className="rv-vision-bg"
        style={{ backgroundColor: "#e8f5e9", padding: "40px 0" }}
      >
        <div className="container">
          <DivAnimateYAxis>
            <div className="rv-vision-section text-center">
              <div className="rv-1-section__heading justify-content-center ">
                {/* <h6 className="rv-1-section__sub-title">{t('visionSubtitle')}</h6> */}
                <h2 className="rv-1-section__title">
                  {stripDot(t("visionTitle"), isAr)}
                </h2>
              </div>
              <p className="rv-vision-descr mx-auto">{t("visionDesc")}</p>
            </div>
          </DivAnimateYAxis>
        </div>
      </div>

      <div className="container position-relative">
        {/* --- Our Philosophy / Core Values --- */}
        <div className="rv-philosophy-grid mt-40 mb-40">
          <div className="rv-1-section__heading ">
            {/* <h6 className="rv-1-section__sub-title">{t('philosophySubtitle')}</h6> */}
            <h2 className="rv-1-section__title">
              {stripDot(t("philosophyTitle"), isAr)}
            </h2>
          </div>

          <div className="row g-4">
            {[
              {
                title: t("stewardshipTitle"),
                icon: <IconStewardship />,
                desc: t("stewardshipDesc"),
              },
              {
                title: t("qualityTitle"),
                icon: <IconQuality />,
                desc: t("qualityDesc"),
              },
              {
                title: t("respectTitle"),
                icon: <IconRespect />,
                desc: t("respectDesc"),
              },
              {
                title: t("integrityTitle"),
                icon: <IconSafe />,
                desc: t("integrityDesc"),
              },
            ].map((value, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <DivAnimateYAxis duration={1 + index * 0.1}>
                  <div className="rv-value-card">
                    <div className="rv-value-card__icon">{value.icon}</div>
                    <h4 className="rv-value-card__title">
                      {stripDot(value.title, isAr)}
                    </h4>
                    <p className="rv-value-card__desc">{value.desc}</p>
                  </div>
                </DivAnimateYAxis>
              </div>
            ))}
          </div>
        </div>

        {/* The Memorial / Legacy Card */}
        {/* <DivAnimateYAxis>
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
        </DivAnimateYAxis> */}
      </div>
    </section>
  );
};

export default AboutSection2;
