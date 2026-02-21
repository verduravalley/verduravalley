'use client';

import { useTranslations, useLocale } from "next-intl";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import CloudinaryImage from "@/components/CloudinaryImage";
import { stripDot } from "@/lib/stripDot";

const TeamSection = () => {
  const t = useTranslations('home.team');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const caterToData = [
    {
      id: 1,
      nameKey: "foodProcessors" as const,
      image: "https://res.cloudinary.com/dh1mv7xlv/image/upload/v1770052633/food-processors_n7f5zy.jpg",
    },
    {
      id: 2,
      nameKey: "hotels" as const,
      image: "https://res.cloudinary.com/dh1mv7xlv/image/upload/v1771448395/pexels-cottonbro-4253125_aju5xj.jpg",
    },
    {
      id: 3,
      nameKey: "retailers" as const,
      image: "https://res.cloudinary.com/dh1mv7xlv/image/upload/v1770052651/grocery-store_whs3cp.jpg",
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
                  
                </div>

                <div>
                  <h2 className="rv-20-team_section_title rv-text-anime">
                     {stripDot(t('title'), isAr)}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DivAnimateYAxis className="row justify-content-center">
          {caterToData.map((item) => (
            <div className="col-md-6 col-sm-8 col-lg-4" key={item.id}>
              <div className="rv-20-single_team">
                <div className="rv-20-single_team_image">
                  <CloudinaryImage 
                    src={item.image} 
                    alt={t(item.nameKey)} 
                    width={400} 
                    height={500} 
                  />
                </div>
                <div className="rv-20-team_member_info">
                  <h4 className="rv-20-team_member_name">
                    <a href="#">{stripDot(t(item.nameKey), isAr)}</a>
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
