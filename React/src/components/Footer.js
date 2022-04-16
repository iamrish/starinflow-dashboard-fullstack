import React from "react";

const Footer = ({ clicked }) => {
  return (
    <div
      className="footer"
      style={{
        textAlign: "center",
        padding: "0px 0px 20px 0px",
        opacity: clicked ? 0 : 1,
      }}
    >
      StrainFlow Dashboard (c) 2021-2022
      <br /> GISAID data provided on this website are subject to{" "}
      <a href="https://www.gisaid.org/registration/terms-of-use/">
        GISAID Terms and Conditions
      </a>
    </div>
  );
};

export default Footer;
