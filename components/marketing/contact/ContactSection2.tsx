'use client';

import ContactForm from "../form/ContactForm";
import DivAnimateXAxis from "../utils/DivAnimateXAxis";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import { useTranslations, useLocale } from "next-intl";
import { stripDot } from "@/lib/stripDot";

type Props = {
  innerPage?: boolean;
};
const ContactSection2 = ({ innerPage }: Props) => {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section
      className={`rv-2-contact ${
        innerPage ? "rv-inner-contact rv-section-spacing" : ""
      }`}
      id="contact"
    >
      <div className="container">
        {innerPage ? (
          <DivAnimateYAxis className="rv-inner-contact-info-cards">
            <div className="rv-inner-contact-info">
              <div className="rv-inner-contact-info__heading">
                <div className="rv-inner-contact-info__icon">
                  <i className="fa-regular fa-phone"></i>
                </div>
                <div>
                  <h5 className="rv-inner-contact-info__title">
                    {stripDot(t('contactNumbers'), isAr)}
                  </h5>
                </div>
              </div>

              <div className="rv-inner-contact-info__bottom">
                <ul className="rv-5-footer-timings">
                  <li>
                    <a href="tel:0123456789">01021002597</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rv-inner-contact-info">
              <div className="rv-inner-contact-info__heading">
                <div className="rv-inner-contact-info__icon">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div>
                  <h5 className="rv-inner-contact-info__title">
                    {stripDot(t('emailAddress'), isAr)}
                  </h5>
                </div>
              </div>

              <div className="rv-inner-contact-info__bottom">
                <ul className="rv-5-footer-timings">
                  <li>
                    <a href="mailto:info@verduravalley.com">info@verduravalley.com</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rv-inner-contact-info">
              <div className="rv-inner-contact-info__heading">
                <div className="rv-inner-contact-info__icon">
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div>
                  <h5 className="rv-inner-contact-info__title">
                    {stripDot(t('workingDays'), isAr)}
                  </h5>
                </div>
              </div>

              <div className="rv-inner-contact-info__bottom">
                <ul className="rv-5-footer-timings">
                  <li>
                    <span className="key">{t('sundayThursday')} </span>
                    {/* <span className="value">{t('hoursValue')}</span> */}
                  </li>
                </ul>
              </div>
            </div>
          </DivAnimateYAxis>
        ) : (
          <div>
            <h2 className="rv-2-section-title rv-text-anime">
              {stripDot(t('readyToHelp'), isAr)}
            </h2>
          </div>
        )}

        <div className="row gy-3 gy-sm-4">
          <DivAnimateXAxis position={-60} className="col-xxl-8 col-lg-7">
            <div
              className={`rv-2-contact__txt ${
                innerPage ? "rv-inner-contact__txt" : ""
              }`}
            >
              <div>
                <h3 className="rv-2-contact-form-title">{stripDot(t('letsConnect'), isAr)}</h3>
              </div>

              <ContactForm innerPage={innerPage ? true : false} />
            </div>
          </DivAnimateXAxis>

          <DivAnimateXAxis className="col-xxl-4 col-lg-5" position={60}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27630.36883782952!2d31.2203604!3d30.0444196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c8c4f8b6a3%3A0x6f1b6b3d3b9a0d8e!2sCairo!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </DivAnimateXAxis>
        </div>
      </div>
    </section>
  );
};

export default ContactSection2;
