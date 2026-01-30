import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const TeamSection = () => {
  const caterToData = [
    {
      id: 1,
      name: "Food Processors",
      image: "https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768250848/organiyo/Food%20Processors.jpg",
    },
    {
      id: 2,
      name: "Hotels",
      image: "https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768251056/organiyo/Hotels.jpg",
    },
    {
      id: 3,
      name: "Retailers & Distributors",
      image: "/assets/images/Retailers & Distributors.jpg",
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
                  <p className="rv-20-team_sub_title rv-text-anime d-flex">
                    <span></span> Our Clients
                  </p>
                </div>

                <div>
                  <h2 className="rv-20-team_section_title rv-text-anime">
                     Who We Cater To
                  </h2>
                </div>
              </div>
              {/* <div className="rv-20-team_button_area">
                <a href="#" className="rv-20-team_btn">
                  Explore More
                </a>
              </div> */}
            </div>
          </div>
        </div>
        <DivAnimateYAxis className="row justify-content-center">
          {caterToData.map((item) => (
            <div className="col-md-6 col-sm-8 col-lg-4" key={item.id}>
              <div className="rv-20-single_team ">
                <div className="rv-20-single_team_image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="rv-20-team_member_info">
                  <h4 className="rv-20-team_member_name">
                    <a href="#">{item.name}</a>
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
