import Link from "next/link";
// import NewsletterForm2 from "../form/NewsletterForm2";

const FooterSection3 = () => {
  return (
    <footer className="rv-inner-footer">
      <div className="container">
        <div className="rv-8-footer-middle">
          <div className="row g-4 justify-content-xl-between justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6 col-8 col-xxs-12">
              <div className="rv-1-footer__about">
                <Link href="/">
                  <img
                    src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768251104/organiyo/Logos/Verdura-Valley.png"
                    alt="Logo"
                    className="logo"
                    width={90}
                  />
                </Link>
                <p className="rv-1-footer__about-txt">
                  Verdura Valley transforms a historic family site into a modern hub for sustainable agriculture and high-quality food production. We honor our legacy while delivering fresh, safe, and innovative products.
                </p>
                <div className="rv-1-socials rv-inner-socials">
                  {/* <Link href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  <Link href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </Link> */}
                  <Link href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </Link>
                  {/* <Link href="#">
                    <i className="fa-brands fa-pinterest-p"></i>
                  </Link> */}
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-lg-3 col-md-3 col-6 col-xxs-12">
              <div className="rv-1-footer-widget rv-inner-footer-widget">
                <h5 className="rv-1-footer-widget__title">Useful Links</h5>
                <ul className="rv-8-footer-widget__links">
                  <li>
                    <Link href="#">About Us</Link>
                  </li>
                  <li>
                    <Link href="#">Latest Work</Link>
                  </li>
                  <li>
                    <Link href="#">Team Member</Link>
                  </li>
                  <li>
                    <Link href="#">Latest Blog</Link>
                  </li>
                  <li>
                    <Link href="#">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-lg-3 col-md-3 col-6 col-xxs-12">
              <div className="rv-1-footer-widget rv-inner-footer-widget">
                <h5 className="rv-1-footer-widget__title">Our Services</h5>
                <ul className="rv-8-footer-widget__links">
                  <li>
                    <a href="#">Sustainable Farming</a>
                  </li>
                  <li>
                    <a href="#">Hygienic Handling</a>
                  </li>
                  <li>
                    <a href="#">Fresh Produce</a>
                  </li>
                  <li>
                    <a href="#">Custom Supply</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* <div className="col-xl-3 col-lg-5 col-md-6 col-8 col-xxs-12">
              <div className="rv-1-footer-nwsltr">
                <h5 className="rv-1-footer-widget__title">Newsletter Signup</h5>
                <NewsletterForm2 />
              </div>
            </div> */}
          </div>
        </div>

        <div className="rv-2-footer rv-8-footer-bottom">
          <div className="row gy-3 align-items-center">
            <div className="col-md-8">
              <p className="rv-2-copyright rv-1-copyright mb-0 text-center text-md-start">
                &copy; {new Date().getFullYear()} Codebasket All Rights Reserved
                by site
              </p>
            </div>
            <div className="col-md-4 text-center text-md-end">
              <div className="rv-2-footer__nav">
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Term of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection3;
