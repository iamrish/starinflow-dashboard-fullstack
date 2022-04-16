import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const menu = () => {
  return (
    <div className="ui pointing menu">
      <Link to="/">
        <img
          src={logo}
          alt="STRAINFLOW"
          style={{
            paddingLeft: "20px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
          className="ui image fluid"
        />
      </Link>
      <div className="right menu">
        <Link to="/" className="item" style={{ paddingTop: "10px important" }}>
          Cases Plots
        </Link>
        <Link to="/entropy-plots" className="item">
          Entropy Plots
        </Link>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="ui grid">
      <div className="row">
        <div className="sixteen wide column">{menu()}</div>
      </div>
    </div>
  );
};

export default Header;
