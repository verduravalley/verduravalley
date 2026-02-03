"use client";

import { serviceData } from "@/data/Data";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import CloudinaryImage from "@/components/CloudinaryImage";
import IconFood from "../utils/svg/IconFood";
import IconClean from "../utils/svg/IconClean";
import IconWater from "../utils/svg/IconWater";
import IconClimate from "../utils/svg/IconClimate";

const ServiceSection = () => {
  const t = useTranslations('home.service');
  const serviceRef = useRef<HTMLDivElement>(null);
  const [activeItemId, setActiveItemId] = useState<number>(0);

  const iconMap = {
    1: IconFood,
    2: IconClean,
    3: IconWater,
    4: IconClimate,
  };

  const customServices = [
    {
      id: 1,
      titleKey: "s1Title" as const,
      icon: IconFood,
      dropKey: "s1Drop" as const,
      listKeys: ["s1l1"] as const,
    },
    {
      id: 2,
      titleKey: "s2Title" as const,
      icon: IconClean,
      dropKey: "s2Drop" as const,
      listKeys: ["s2l1"] as const,
    },
    {
      id: 3,
      titleKey: "s3Title" as const,
      icon: IconWater,
      dropKey: "s3Drop" as const,
      listKeys: ["s3l1"] as const,
    },
    {
      id: 4,
      titleKey: "s4Title" as const,
      icon: IconClimate,
      dropKey: "s4Drop" as const,
      listKeys: ["s4l1"] as const,
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
                {/* <p className="rv-20-service_sub_title rv-text-anime d-flex">
                  <span></span> {t('subtitle')}
                </p> */}
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
                  <div style={{ width: '100%', height: '300px', paddingLeft: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
                    {item.icon && <item.icon />}
                  </div>
                </div>
                <div
                  className="rv-20-single_service_content_main"
                  ref={serviceRef}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="visible-part">
                    <div className="rv-20-single_service_content_top">
                      {/* <div className="rv-20-single_service_icon">
                        <CloudinaryImage src={item.imgIcon} alt="image" width={80} height={80} />
                      </div> */}
                    </div>

                    <div className="rv-20-single_service_content_title">
                      <h4>{t(item.titleKey)}</h4>
                    </div>
                  </div>
                  <div className="hidden-part">
                    <ul className="rv-20-single_service_list">
                      {item.listKeys.map((listKey, index) => (
                        <li key={index}>
                          {/* <i className="fas fa-check"></i> */}
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
        <CloudinaryImage src="/assets/img/services/home-6-service-4.png" alt="image" width={300} height={300} />
      </span>
      <span className="service-sh-2">
        <CloudinaryImage src="/assets/img/services/home-6-service-5.png" alt="image" width={300} height={300} />
      </span>
    </section>
  );
};

export default ServiceSection;
