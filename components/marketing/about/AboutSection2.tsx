import DivAnimateXAxis from "../utils/DivAnimateXAxis";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import IconIntegrity from "../utils/svg/IconIntegrity";
import IconRespect from "../utils/svg/IconRespect";

import IconSafe from "../utils/svg/IconSafe";
import IconStewardship from "../utils/svg/IconStewardship";

type Props = {
  btnStyle?: string;
};

const AboutSection2 = ({ btnStyle }: Props) => {
  return (
    <section className="rv-1-about rv-section-spacing">
      <div className="container position-relative">
        <div className="row rv-1-about-row g-0 justify-content-between">
          {/* Left Side: Main Visual (The Modern Facility) */}
          <DivAnimateXAxis className="col-xl-5 col-lg-6" position={-80}>
            <div className="rv-1-about__img reveal">
              <img src="assets/img/about-img-1.jpg" alt="Verdura Valley Facility" />
            </div>
          </DivAnimateXAxis>

          {/* Right Side: The Narrative */}
          <DivAnimateXAxis className="col-xxl-6 col-xl-7 col-lg-6" position={80}>
            <div className="rv-1-about__txt">
              <div className="rv-1-section__heading">
                <div>
                  <h6 className="rv-1-section__sub-title rv-text-anime">
                    The Story Behind Our Company
                  </h6>
                </div>
                <div>
                  <h2 className="rv-1-section__title rv-text-anime">
                    A Legacy of Excellence, <br /> Reimagined for the Future.
                  </h2>
                </div>
              </div>

              <ul className="rv-1-about__pills">
                <li className="rv-1-about__pill">Heritage</li>
                <li className="rv-1-about__pill">Restoration</li>
                <li className="rv-1-about__pill">Innovation</li>
              </ul>

              <div className="rv-1-about__history">
                <p className="rv-1-about__descr">
                  <strong>Verdura Valley</strong> is the evolution of a legacy. transforming a former textile facility into a modern agricultural and food production company
                </p>
                <p className="rv-1-about__descr">
                  The site was originally developed in the 1980’s by <strong>Medhat Marzouk</strong>, founder of Marzouk Textiles Industries, who began with undeveloped land and built a brick operation before establishing a textile manufacturing facility. After years of operation, the company closed in the early 2000’s due to changing circumstances, leaving the facility dormant for more than fifteen years.
                </p>
                <p className="rv-1-about__descr">
                  In 2025, the site was revisited by <strong>Maged Medhat Marzouk</strong>, the founder’s son, who had long hoped to one day work alongside his father and continue the family business. Although that opportunity ended with his father’s passing in 2014, the vision of restoring the facility endured.
                </p>
                <p className="rv-1-about__descr">
                  Late 2025, the decision was made to revive the site with a new purpose. January 2026 Verdura Valley was established to restore, repurpose, and reimagine the facility - beginning with extensive cleaning, preparation, and redevelopment - marking the start of a new chapter focused on modern, high-standard agricultural and food production.
                </p>
              </div>
            </div>
          </DivAnimateXAxis>
        </div>
      </div>

      {/* --- Our Vision (Full Width Background) --- */}
      <div className="rv-vision-bg" style={{ backgroundColor: '#e8f5e9', padding: '80px 0' }}>
        <div className="container">
          <DivAnimateYAxis>
            <div className="rv-vision-section text-center">
              <div className="rv-1-section__heading justify-content-center">
                <h6 className="rv-1-section__sub-title">Our Vision</h6>
                <h2 className="rv-1-section__title">Healthy produce, artisan foods,<br/> globally recognized.</h2>
              </div>
              <p className="rv-vision-descr mx-auto">
                We believe achieving this vision requires more than ambition—it demands discipline, integrity, and a deep respect for both people and nature.
              </p>
            </div>
          </DivAnimateYAxis>
        </div>
      </div>

      <div className="container position-relative">
        {/* --- Our Philosophy / Core Values --- */}
        <div className="rv-philosophy-grid mt-100 mb-100">
          <div className="rv-1-section__heading mb-50">
            <h6 className="rv-1-section__sub-title">Our Philosophy</h6>
            <h2 className="rv-1-section__title">Core Values</h2>
          </div>
          
          <div className="row g-4">
            {[
              {
                title: "Stewardship",
                icon: <IconStewardship />,
                desc: "Long-term custodians of land and water - protecting the future of food production."
              },
              {
                title: "Quality",
                icon: <IconSafe />,
                desc: "Safe, healthy, and consistent food without compromise, from farm to delivery."
              },
              {
                title: "Respect",
                icon: <IconRespect />,
                desc: "Valuing our teams and partners through fairness, safety, and mutual trust."
              },
              {
                title: "Integrity",
                icon: <IconIntegrity />,
                desc: "Transparent processes and honest commitments. We stand behind every product."
              }
            ].map((value, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <DivAnimateYAxis duration={1 + (index * 0.1)}>
                  <div className="rv-value-card">
                    <div className="rv-value-card__icon">
                      {value.icon}
                    </div>
                    <h4 className="rv-value-card__title">{value.title}</h4>
                    <p className="rv-value-card__desc">{value.desc}</p>
                  </div>
                </DivAnimateYAxis>
              </div>
            ))}
          </div>
        </div>

        {/* The Memorial / Legacy Card */}
        <DivAnimateYAxis>
          <div className="rv-legacy-card mt-40 mb-40 w-100">
            <div className="d-flex align-items-start align-items-md-center gap-4 flex-column flex-md-row">
              <div className="rv-legacy-card__img-wrapper">
                <img
                  src="/assets/images/medhat-marzouk.jpg"
                  alt="In Memory of Medhat Marzouk"
                  className="rv-legacy-img"
                />
              </div>

              <div className="rv-legacy-card__txt">
                <span className="rv-legacy-tag">In Loving Memory</span>
                <h4 className="rv-legacy-name">Medhat Marzouk</h4>
                <span className="rv-legacy-dates">May 6, 1949 – January 9, 2014</span>
                <p className="rv-legacy-desc">
                  Founder of Marzouk Textiles Industries. A devoted husband and father, he built his life and work on integrity, education, and hard work. Verdura Valley stands as a continuation of his legacy, transformed by his son with the hope of making him proud.
                </p>
              </div>
            </div>
          </div>
        </DivAnimateYAxis>


        <div className="rv-1-about__vectors">
          <img src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768434580/rv-1-vector-6_pk9i7z.png" alt="vector" className="rv-1-about__vector rv-1-about__vector-1" />
          <img src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768434580/rv-1-vector-7_nmuwed.png" alt="vector" className="rv-1-about__vector rv-1-about__vector-2" />
          <img src="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768434581/rv-1-vector-8_k11vah.png" alt="vector" className="rv-1-about__vector rv-1-about__vector-3" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection2;