import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Landing.css";
import Header from "../../components/Header/Header";
import AboutUs from "../../components/AboutUs/AboutUs";

const Landing = () => {
  return (
    <div className="background">
      <Navbar />
      <Header />
      <AboutUs />
    </div>
  );
};

export default Landing;
