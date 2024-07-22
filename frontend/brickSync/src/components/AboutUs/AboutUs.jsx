import React from "react";
import "./AboutUs.css";
import { assets } from "../../assets/assets";

const AboutUs = () => {
  return (
    <div className="container-aboutUs">
      <h1 className="h1-aboutUs">About us</h1>
      <div className="aboutUs-top">
        <p>
          BrickSync is a construction suppliers management system designed to
          streamline your supply chain and workforce management. Our platform
          offers a comprehensive solution to manage your inventory, track your
          workforce, and ensure timely deliveries. Founded with a vision to
          bring efficiency to the construction industry, we are dedicated to
          helping businesses succeed.
        </p>
        <img src={assets.aboutUs_1} alt="" />
      </div>
      <div className="aboutUs-bot">
        <img src={assets.aboutUs_2} alt="" />
        <p>
          Our team comprises experienced professionals from the construction and
          technology sectors who are passionate about making a difference. We
          believe in continuous improvement and innovation to meet the evolving
          needs of our customers.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
