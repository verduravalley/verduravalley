"use client";
import { serviceData } from "@/data/Data";
import { useRef, useState } from "react";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const ServiceSection = () => {
  const serviceRef = useRef<HTMLDivElement>(null);
  const [activeItemId, setActiveItemId] = useState<number>(0);

  const customServices = [
    {
      id: 1,
      title: "High Food Safety Standards",
      imgMain: serviceData[9]?.imgMain || "",
      imgIcon: serviceData[9]?.imgIcon || "",
      dropText: "Safety First",
      list: [
        "Strict Quality Control",
        "Safe Storage Practices",
        "Regular Safety Inspections",
        "Contamination Prevention",
      ],
    },
    {
      id: 2,
      title: "Clean Handling & Hygiene Standards",
      imgMain: serviceData[10]?.imgMain || "",
      imgIcon: serviceData[10]?.imgIcon || "",
      dropText: "Hygiene Excellence",
      list: [
        "Sanitized Work Areas",
        "Proper Food Handling",
        "Staff Hygiene Training",
        "Clean Packaging Process",
      ],
    },
    {
      id: 3,
      title: "Water-Efficient & Eco-Friendly Farming",
      imgMain: serviceData[11]?.imgMain || "",
      imgIcon: serviceData[11]?.imgIcon || "",
      dropText: "Sustainability",
      list: [
        "Smart Irrigation Systems",
        "Water Conservation Methods",
        "Sustainable Farming Practices",
        "Reduced Environmental Impact",
      ],
    },
    {
      id: 4,
      title: "Safety & Wellbeing",
      imgMain: serviceData[12]?.imgMain || "",
      imgIcon: serviceData[12]?.imgIcon || "",
      dropText: "Worker Protection",
      list: [
        "Worker Safety Measures",
        "Healthy Work Environment",
        "Equipment Safety Standards",
        "Continuous Safety Training",
      ],
    },
  ];

  const handleMouseEnter = (id: number) => {
    setActiveItemId(id);
  };

  const handleMouseLeave = () => {
    // Do nothing or add additional logic if needed when mouse leaves
  };
  return (
    <section className="rv-20-service_section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="rv-20-service_section_heading">
              <div>
                <p className="rv-20-service_sub_title rv-text-anime d-flex">
                  <span></span> Our Standards
                </p>
              </div>
              <div>
                <h2 className="rv-20-service_section_title rv-text-anime">
                   Why Verdura Valley



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
                      <h4>{item.title}</h4>
                    </div>
                  </div>
                  <div className="hidden-part">
                    <ul className="rv-20-single_service_list">
                      {item.list.map((listItem, index) => (
                        <li key={index}>
                          <i className="fas fa-check"></i>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <h4 className="rv-20-service_drp_txt">{item.dropText}</h4>
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
