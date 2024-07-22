import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Landing.css";
import Header from "../../components/Header/Header";
import AboutUs from "../../components/AboutUs/AboutUs";
import Services from "../../components/Services/Services";
import Footer from "../../components/Footer/Footer";

const Landing = () => {
  return (
    <>
      <div className="background">
        <Navbar />
        <Header />
        <AboutUs />
        <Services />
      </div>
      <Footer />
    </>
  );
};

export default Landing;
