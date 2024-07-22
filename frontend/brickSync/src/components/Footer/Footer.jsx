import React from "react";
import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo_1} alt="" />
          <h3>Follow us at</h3>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h3>Get Started</h3>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Services</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h3>Contact</h3>
          <ul>
            <li>+977-9841982132</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy; BrickSync.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
