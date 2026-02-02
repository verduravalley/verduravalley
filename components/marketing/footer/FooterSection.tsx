'use client';

import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import CloudinaryImage from "@/components/CloudinaryImage";

type Props = {
  style?: string;
  logo: string;
  footerContactStyle?: string;
  footerFormStyle?: string;
};

const FooterSection = ({
  style,
  logo,
  footerContactStyle,
}: Props) => {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <footer className={`rv-9-footer ${style ? style : ""}`}>
      <div className="container">

        {/* Main Footer Content - Combined Top & Middle for better balance */}
        <div className="rv-8-footer-middle pt-5 pb-4">
          <div className="row gy-4 justify-content-between">

            {/* COLUMN 1: Brand & About (Width: 4/12) */}
            <div className="col-12 col-md-3 col-lg-4">
              <div className="rv-1-footer__about">
                            <Link href="/" style={{ textDecoration: 'none' }} className="mb-4 d-block">
                              <CloudinaryImage src={logo} alt="logo" className="logo" width={120} height={40} />
                            </Link>
                <p className="rv-1-footer__about-txt">
                  {t('aboutText')}
                </p>
                <div className="rv-1-socials rv-15-socials rv-20-socials mt-3">
                  <a href="#" style={{ textDecoration: 'none' }}>
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Services Links (Width: 3/12) */}
            <div className="col-12 col-md-3 col-lg-3 pt-5">
              <div className="rv-1-footer-widget rv-20-footer-widget">
                {/* <h5 className="rv-1-footer-widget__title mb-3">{t('ourServices')}</h5> */}
                <ul className="rv-8-footer-widget__links">
                  <li>
                      <Link href="/about" style={{ textDecoration: 'none' }}>{tn('aboutUs')}</Link>
                  </li>
                  <li>
                    <Link href="/leadership" style={{ textDecoration: 'none' }}>{tn('leadership')}</Link>
                  </li>
                  <li>
                    <Link href="/code-of-conduct" style={{ textDecoration: 'none' }}>{tn('codeOfConduct')}</Link>
                  </li>
                  <li>
                    <Link href="/sustainability-governance" style={{ textDecoration: 'none' }}>{tn('sustainabilityPage')}</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* COLUMN 3: Contact Info - Moved here to fill space (Width: 4/12) */}
            <div className="col-12 col-md-3 col-lg-4">
              <div className="rv-1-footer-widget rv-20-footer-contact">
                <h5 className="rv-1-footer-widget__title mb-3">{t('contactUs')}</h5>

                <div className="rv-footer-contact-list">
                  {/* Phone */}
                  <div className={`rv-footer-contact-item ${footerContactStyle || ""}`}>
                    <div className="icon">
                        <i className="fa-regular fa-phone-volume"></i>
                    </div>
                    <div className="text">
                        <span>{t('callUs')}</span>
                        <a href="tel:01021002597" style={{ textDecoration: 'none' }} dir={isArabic ? 'ltr' : undefined}>0123 456 789</a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className={`rv-footer-contact-item ${footerContactStyle || ""}`}>
                    <div className="icon">
                        <i className="fa-light fa-envelope"></i>
                    </div>
                    <div className="text">
                        <span>{t('emailUs')}</span>
                        <a href="mailto:info@verduravalley.com" style={{ textDecoration: 'none' }}>info@verduravalley.com</a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className={`rv-footer-contact-item ${footerContactStyle || ""}`}>
                    <div className="icon">
                        <i className="fa-light fa-location-dot"></i>
                    </div>
                    <div className="text">
                        <span>{t('location')}</span>
                        <p>{t('locationValue')}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="rv-2-footer rv-8-footer-bottom">
        <div className="container">
          <div className="row align-items-center gy-3">
            <div className="col-md-7">
              <p className="rv-2-copyright rv-1-copyright mb-0 text-center text-md-start">
                {t('copyright', { year: new Date().getFullYear() })}
              </p>
            </div>

            <div className="col-md-5">
                <div className="rv-2-footer__nav rv-20-footer-bottom__nav justify-content-center justify-content-md-end">
                <a href="#" style={{ textDecoration: 'none' }}>{t('privacyPolicy')}</a>
                <a href="#" style={{ textDecoration: 'none' }}>{t('termsOfService')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
