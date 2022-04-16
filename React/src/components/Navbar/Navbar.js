import React from "react";
import MenuItems from "./MenuItems";
import { Link } from "react-router-dom";

import logo from "../../images/logo.png";

import "./Navbar.css";
const Navbar = ({ clicked, setClicked }) => {
  // const [clicked, setClicked] = useState(false);

  return (
    <nav className="NavbarItems">
      <Link to="/" className="navbar-logo">
        <img
          src={logo}
          alt="STRAINFLOW"
          style={{
            paddingLeft: "20px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        />
      </Link>
      <div
        className="menu-icon"
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        <i className="fas fa-bars"></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <Link key={index} to={item.to}>
              <li
                className={item.cName}
                onClick={() => {
                  setClicked(false);
                }}
              >
                {item.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
