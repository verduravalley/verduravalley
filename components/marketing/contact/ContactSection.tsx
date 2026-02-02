'use client';

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import CloudinaryImage from "@/components/CloudinaryImage";

const ContactSection = () => {
  const t = useTranslations('home.contact');

  return (
    <section className="rv-20-contact_main_section">
      <div className="container">
        {/* Section Title */}
        <div className="row">
          <div className="col-12 text-center mb-50">
            <div className="rv-20-contact_section_heading">
              {/* <p className="rv-20-contact_sub_title rv-text-anime d-flex m-auto">
                <span></span>{t('subtitle')}
              </p> */}
              <h2 className="rv-20-contact_section_title rv-text-anime">
                  {t('title')}
              </h2>
            </div>
          </div>
        </div>

        <DivAnimateYAxis className="row align-items-center">
          {/* Left Side: Image */}
          <div className="col-md-12 col-lg-5">
            <div className="rv-20-contact_image">
              <CloudinaryImage
                src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1770052638/restaurants-and-hotels_d7tskf.jpg"
                alt="Operations in Cairo, Egypt"
                width={800}
                height={600}
              />
            </div>
          </div>

          {/* Right Side: Text & CTA */}
          <div className="col-md-12 col-lg-7">
            <div className="rv-20-contact_form_area">
                <p className="mt-20 mb-30 text-content">
                  {t('descriptionPre')} <strong>{t('descriptionLocation')}</strong>{t('descriptionPost')}
                </p>

              <div className="rv-20-contact_cta_wrapper mt-40">
                <Link href="/contact" className="rv-20-btn">
                  {t('cta')}
                </Link>
              </div>
            </div>
          </div>
        </DivAnimateYAxis>
      </div>

      {/* Decorative Background Elements */}
      <span className="home-6-sh-1">
        <CloudinaryImage src="/assets/img/contact/home-6-sh-1.png" alt="shape" width={200} height={200} />
      </span>
      <span className="home-6-sh-2">
        <CloudinaryImage src="/assets/img/contact/home-6-sh-2.png" alt="shape" width={200} height={200} />
      </span>
    </section>
  );
};

export default ContactSection;
