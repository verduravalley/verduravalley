import NumberCounter from "../utils/NumberCounter";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const AboutSection = () => {
  return (
    <section className="rv-20-about_section">
      <div className="container">
        {/* Added justify-content-center to the row to keep everything middle-aligned */}
        <DivAnimateYAxis className="row justify-content-center">
          
          {/* Increased width to col-lg-10 for a centered, readable spread */}
          <div className="col-md-12 col-lg-10 col-xl-9">
            <div className="rv-20-about_section_content text-center">
              
              {/* Heading Section */}
              <div className="rv-20-about_section_heading">
                <div className="d-flex justify-content-center">
                  <p className="rv-20-about_sub_title rv-text-anime d-flex">
                    <span></span> Our Vision
                  </p>
                </div>
                <div>
                  <h2 className="rv-20-about_section_title rv-text-anime">
                    Bringing the Farm to Your Table with Integrity.
                  </h2>
                </div>
              </div>

              {/* Experience Counter moved to a prominent central position */}
              <div className="rv-20-about_experience_txt mb-50" style={{ margin: '0 auto', display: 'inline-block' }}>
                <NumberCounter
                  number={3}
                  initialNumber={1}
                  durationToComplete={2}
                  icon="+"
                />
                <p>Core Products and Services</p>
              </div>

              {/* Mission and Goals Row - Adjusted for horizontal centering */}
              <div className="rv-20-about_content_top_actions d-flex justify-content-center flex-wrap">
                <div className="rv-20-about_content_single_top_actions text-start">
                  <div className="rv-20-about_content_single_top_actions_left">
                    <h3>Our Mission</h3>
                    <p>Delivering healthy, high-quality fresh produce and artisan foods globally.</p>
                  </div>
                  <div className="rv-20-about_content_single_top_actions_icon">
                    <i className="fas fa-leaf" style={{ color: "#2D6A4F" }}></i>
                  </div>
                </div>
                
                <div className="rv-20-about_content_single_top_actions text-start">
                  <div className="rv-20-about_content_single_top_actions_left">
                    <h3>Artisan Quality</h3>
                    <p>Crafting food with traditional methods and modern safety standards.</p>
                  </div>
                  <div className="rv-20-about_content_single_top_actions_icon">
                    <i className="fas fa-award" style={{ color: "#2D6A4F" }}></i>
                  </div>
                </div>
              </div>

              {/* Detail List - Using text-start for the list items to maintain readability */}
              <div className="rv-20-about_list mt-40">
                <ul className="row">
                  <li className="col-md-6 text-start">
                    <h4>
                      <i className="far fa-chevron-double-right"></i>Sustainable Growth
                    </h4>
                    <p>Eco-friendly farming practices to protect our soil and your health.</p>
                  </li>

                  <li className="col-md-6 text-start">
                    <h4>
                      <i className="far fa-chevron-double-right"></i>Global Standards
                    </h4>
                    <p>A Cairo-based hub meeting international safety certifications.</p>
                  </li>
                  
                  <li className="col-md-6 text-start">
                    <h4>
                      <i className="far fa-chevron-double-right"></i>Fresh Harvest
                    </h4>
                    <p>Minimizing field-to-kitchen time for maximum nutrient density.</p>
                  </li>
                  
                  <li className="col-md-6 text-start">
                    <h4>
                      <i className="far fa-chevron-double-right"></i>Artisan Spirit
                    </h4>
                    <p>Supporting local craftsmanship for unique, high-value food products.</p>
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
        </DivAnimateYAxis>
      </div>

      <span className="about-sh-6">
        <img src="assets/img/about/home-6-about-3.png" alt="decorative shape" />
      </span>
    </section>
  );
};

export default AboutSection;
