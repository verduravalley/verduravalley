import React from "react";
import FooterSection from "../footer/FooterSection";
import HeaderSection4 from "../header/HeaderSection4";
type Props = {
  children: React.ReactNode;
};
const InnerLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderSection4 />
      {children}
      <FooterSection
        style="rv-20-footer"
        logo="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768251104/organiyo/Logos/Verdura-Valley.png"
        footerContactStyle="rv-20-footer__contact-card"
        footerFormStyle="rv-20-footer-nwsltr__form"
      />    </>
  );
};

export default InnerLayout;
