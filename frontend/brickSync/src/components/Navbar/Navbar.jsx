import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo_1} className="logo" alt="logo" />
      </Link>
      <ul className="navbar-menu">
        <a href="">About us</a>
        <a href="">Services</a>
        <a href="">Contact us</a>
      </ul>
      <div className="navbar-right">
        <button className="btn-signIn">Sign in</button>
        <button className="btn-signUp">Get started</button>
      </div>
    </div>
  );
};

export default Navbar;
