import React from 'react';
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const ContactSection = () => {
  return (
    <section className="rv-20-contact_main_section">
      <div className="container">
        {/* Section Title moved above the row */}
        <div className="row">
          <div className="col-12 text-center mb-50">
            <div className="rv-20-contact_section_heading">
              <p className="rv-20-contact_sub_title rv-text-anime d-flex m-auto">
                <span></span>Where We Operate
              </p>
              <h2 className="rv-20-contact_section_title rv-text-anime">
                  Based in the Heart of Cairo, Serving the Future of Food.
              </h2>
            </div>
          </div>
        </div>

        <DivAnimateYAxis className="row align-items-center">
          {/* Left Side: Responsive Image */}
          <div className="col-md-12 col-lg-5">
            <div className="rv-20-contact_image">
              <img 
                src="https://res.cloudinary.com/dh1mv7xlv/image/upload/organiyo/contact.jpg" 
                alt="Operations in Cairo, Egypt" 
              />
            </div>
          </div>

          {/* Right Side: Text & Partner CTA */}
          <div className="col-md-12 col-lg-7">
            <div className="rv-20-contact_form_area">
                <p className="mt-20 mb-30 text-content">
                  From our strategic hub in <strong>Cairo, Egypt</strong>, we coordinate 
                  sustainable supply chains that ensure food safety and quality across 
                  the region.
                </p>

              <div className="rv-20-contact_cta_wrapper mt-40">
                <a href="/contact" className="rv-20-btn">
                  Partner with Us
                </a>
              </div>
            </div>
          </div>
        </DivAnimateYAxis>
      </div>

      {/* Decorative Background Elements */}
      <span className="home-6-sh-1">
        <img src="assets/img/contact/home-6-sh-1.png" alt="shape" />
      </span>
      <span className="home-6-sh-2">
        <img src="assets/img/contact/home-6-sh-2.png" alt="shape" />
      </span>
    </section>
  );
};

export default ContactSection;