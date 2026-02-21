'use client';

import { useTranslations } from "next-intl";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import IconFood from "../utils/svg/IconFood";
import IconClean from "../utils/svg/IconClean";
import IconWater from "../utils/svg/IconWater";
import IconClimate from "../utils/svg/IconClimate";

const ServiceSection = () => {
  const t = useTranslations('home.service');

  const services = [
    {
      titleKey: "s1Title" as const,
      icon: <IconFood />,
      descKey: "s1l1" as const,
    },
    {
      titleKey: "s2Title" as const,
      icon: <IconClean />,
      descKey: "s2l1" as const,
    },
    {
      titleKey: "s3Title" as const,
      icon: <IconWater />,
      descKey: "s3l1" as const,
    },
    {
      titleKey: "s4Title" as const,
      icon: <IconClimate />,
      descKey: "s4l1" as const,
    },
  ];

  return (
    <section className="rv-20-service_section">
      <div className="container">
        <div className="rv-philosophy-grid">
          <div className="rv-1-section__heading">
            <h2 className="rv-1-section__title">{t('title')}</h2>
          </div>

          <div className="row g-4">
            {services.map((item, index) => (
              <div className="col-lg-3 col-md-6 d-flex" key={index}>
                <DivAnimateYAxis className="w-100" duration={1 + (index * 0.1)}>
                  <div className="rv-value-card">
                    <div className="rv-value-card__icon">
                      {item.icon}
                    </div>
                    <h4 className="rv-value-card__title">{t(item.titleKey)}</h4>
                    <p className="rv-value-card__desc">{t(item.descKey)}</p>
                  </div>
                </DivAnimateYAxis>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
