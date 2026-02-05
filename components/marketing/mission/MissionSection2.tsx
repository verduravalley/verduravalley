'use client';

import { useTranslations } from "next-intl";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const MissionSection2 = () => {
  const t = useTranslations('home.mission2');

  return (
    <section className="rv-20-mission_section mt-5">
      <div className="container">
        <DivAnimateYAxis className="row justify-content-center">
          <div className="col-lg-12 col-xl-12">
            <div className="rv-20-mission_content">
              <div className="rv-20-mission_heading">
                {/* <p className="rv-20-mission_sub_title rv-text-anime d-flex justify-content-center">
                  <span></span> {t('subtitle')}
                </p> */}
                  <div className="rv-vision-section text-center">
    <div className="rv-1-section__heading justify-content-center">
    </div>
    <p className="rv-vision-descr mx-auto">
      {t('description')}
    </p>
  </div>
              </div>
            </div>
          </div>
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default MissionSection2;
