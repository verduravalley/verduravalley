import Link from "next/link";

type Props = {
  style?: string;
  logo: string;
  footerContactStyle?: string;
  footerFormStyle?: string; // Made optional since you aren't using it currently
};

const FooterSection = ({
  style,
  logo,
  footerContactStyle,
}: Props) => {
  return (
    <footer className={`rv-9-footer ${style ? style : ""}`}>
      <div className="container">
        
        {/* Main Footer Content - Combined Top & Middle for better balance */}
        <div className="rv-8-footer-middle pt-5 pb-4">
          <div className="row gy-4 justify-content-between">
            
            {/* COLUMN 1: Brand & About (Width: 4/12) */}
            <div className="col-12 col-md-3 col-lg-4">
              <div className="rv-1-footer__about">
                <Link href="/" className="mb-4 d-block">
                  <img src={logo} alt="logo" className="logo" width={120} />
                </Link>
                <p className="rv-1-footer__about-txt">
                  Verdura Valley transforms a historic family site into a modern hub for sustainable agriculture. We honor our legacy while delivering fresh, safe, and innovative products.
                </p>
                <div className="rv-1-socials rv-15-socials rv-20-socials mt-3">
                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Services Links (Width: 3/12) */}
            <div className="col-12 col-md-3 col-lg-3 pt-2">
              <div className="rv-1-footer-widget rv-20-footer-widget">
                <h5 className="rv-1-footer-widget__title mb-3">Our Services</h5>
                <ul className="rv-8-footer-widget__links">
                  <li><a href="#">Sustainable Farming</a></li>
                  <li><a href="#">Hygienic Handling</a></li>
                  <li><a href="#">Fresh Produce</a></li>
                  <li><a href="#">Custom Supply</a></li>
                </ul>
              </div>
            </div>

            {/* COLUMN 3: Contact Info - Moved here to fill space (Width: 4/12) */}
            <div className="col-12 col-md-3 col-lg-4">
              <div className="rv-1-footer-widget rv-20-footer-contact">
                <h5 className="rv-1-footer-widget__title mb-3">Contact Us</h5>
                
                <div className="rv-footer-contact-list">
                  {/* Phone */}
                  <div className={`rv-footer-contact-item ${footerContactStyle || ""}`}>
                    <div className="icon">
                        <i className="fa-regular fa-phone-volume"></i>
                    </div>
                    <div className="text">
                        <span>Call Us</span>
                        <a href="tel:0123 456 789">0123 456 789</a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className={`rv-footer-contact-item ${footerContactStyle || ""}`}>
                    <div className="icon">
                        <i className="fa-light fa-envelope"></i>
                    </div>
                    <div className="text">
                        <span>Email Us</span>
                        <a href="mailto:info@verduravalley.com">info@verduravalley.com</a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className={`rv-footer-contact-item ${footerContactStyle || ""}`}>
                    <div className="icon">
                        <i className="fa-light fa-location-dot"></i>
                    </div>
                    <div className="text">
                        <span>Location</span>
                        <p>Greater Cairo, Egypt</p>
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
                &copy; {new Date().getFullYear()} Verdura Valley. All Rights Reserved.
              </p>
            </div>

            <div className="col-md-5">
              <div className="rv-2-footer__nav rv-20-footer-bottom__nav justify-content-center justify-content-md-end">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;