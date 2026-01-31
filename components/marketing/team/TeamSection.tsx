'use client';

import { useTranslations } from "next-intl";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const TeamSection = () => {
  const t = useTranslations('home.team');

  const caterToData = [
    {
      id: 1,
      nameKey: "foodProcessors" as const,
      image: "https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768250848/organiyo/Food%20Processors.jpg",
    },
    {
      id: 2,
      nameKey: "hotels" as const,
      image: "https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768251056/organiyo/Hotels.jpg",
    },
    {
      id: 3,
      nameKey: "retailers" as const,
      image: "/assets/images/Retailers & Distributors.jpg",
    },
  ];
  return (
    <section className="rv-20-team_main_area_section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="rv-20-team_section_top">
              <div className="rv-20-team_section_heading">
                <div>
                  <p className="rv-20-team_sub_title rv-text-anime d-flex">
                    <span></span> {t('subtitle')}
                  </p>
                </div>

                <div>
                  <h2 className="rv-20-team_section_title rv-text-anime">
                     {t('title')}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DivAnimateYAxis className="row justify-content-center">
          {caterToData.map((item) => (
            <div className="col-md-6 col-sm-8 col-lg-4" key={item.id}>
              <div className="rv-20-single_team ">
                <div className="rv-20-single_team_image">
                  <img src={item.image} alt={t(item.nameKey)} />
                </div>
                <div className="rv-20-team_member_info">
                  <h4 className="rv-20-team_member_name">
                    <a href="#">{t(item.nameKey)}</a>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default TeamSection;
