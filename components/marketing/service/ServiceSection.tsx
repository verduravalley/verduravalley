"use client";

import { serviceData } from "@/data/Data";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const ServiceSection = () => {
  const t = useTranslations('home.service');
  const serviceRef = useRef<HTMLDivElement>(null);
  const [activeItemId, setActiveItemId] = useState<number>(0);

  const customServices = [
    {
      id: 1,
      titleKey: "s1Title" as const,
      imgMain: serviceData[9]?.imgMain || "",
      imgIcon: serviceData[9]?.imgIcon || "",
      dropKey: "s1Drop" as const,
      listKeys: ["s1l1", "s1l2", "s1l3", "s1l4"] as const,
    },
    {
      id: 2,
      titleKey: "s2Title" as const,
      imgMain: serviceData[10]?.imgMain || "",
      imgIcon: serviceData[10]?.imgIcon || "",
      dropKey: "s2Drop" as const,
      listKeys: ["s2l1", "s2l2", "s2l3", "s2l4"] as const,
    },
    {
      id: 3,
      titleKey: "s3Title" as const,
      imgMain: serviceData[11]?.imgMain || "",
      imgIcon: serviceData[11]?.imgIcon || "",
      dropKey: "s3Drop" as const,
      listKeys: ["s3l1", "s3l2", "s3l3", "s3l4"] as const,
    },
    {
      id: 4,
      titleKey: "s4Title" as const,
      imgMain: serviceData[12]?.imgMain || "",
      imgIcon: serviceData[12]?.imgIcon || "",
      dropKey: "s4Drop" as const,
      listKeys: ["s4l1", "s4l2", "s4l3", "s4l4"] as const,
    },
  ];

  const handleMouseEnter = (id: number) => {
    setActiveItemId(id);
  };

  const handleMouseLeave = () => {
  };

  return (
    <section className="rv-20-service_section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="rv-20-service_section_heading">
              <div>
                <p className="rv-20-service_sub_title rv-text-anime d-flex">
                  <span></span> {t('subtitle')}
                </p>
              </div>
              <div>
                <h2 className="rv-20-service_section_title rv-text-anime">
                   {t('title')}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <DivAnimateYAxis className="row justify-content-center">
          {customServices.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-12" key={item.id}>
              <div
                className={`rv-20-single_service ${
                  activeItemId === item.id ? "active" : ""
                }`}
              >
                <div className="rv-20-single_service_iamge">
                  <img src={item.imgMain} alt="image" />
                </div>
                <div
                  className="rv-20-single_service_content_main"
                  ref={serviceRef}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="visible-part">
                    <div className="rv-20-single_service_content_top">
                      <div className="rv-20-single_service_icon">
                        <img src={item.imgIcon} alt="image" />
                      </div>
                    </div>

                    <div className="rv-20-single_service_content_title">
                      <h4>{t(item.titleKey)}</h4>
                    </div>
                  </div>
                  <div className="hidden-part">
                    <ul className="rv-20-single_service_list">
                      {item.listKeys.map((listKey, index) => (
                        <li key={index}>
                          <i className="fas fa-check"></i>
                          {t(listKey)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <h4 className="rv-20-service_drp_txt">{t(item.dropKey)}</h4>
                </div>
              </div>
            </div>
          ))}
        </DivAnimateYAxis>
      </div>

      <span className="service-sh-1">
        <img src="assets/img/services/home-6-service-4.png" alt="image" />
      </span>
      <span className="service-sh-2">
        <img src="assets/img/services/home-6-service-5.png" alt="image" />
      </span>
    </section>
  );
};

export default ServiceSection;
