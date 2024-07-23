import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="container" id="home">
      <div className="header">
        <h1>
          Streamline <span>Your </span>Construction <span>Supply</span>
        </h1>
        <p>
          Efficiently manage your supplies and workforce with our all-in-one
          Construction Suppliers Management System.
        </p>
        <Link to="/signup">
          <button>Register Now</button>
        </Link>
      </div>
      <div className="header-img">
        <img src={assets.dashboard_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
