import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Landing.css";
import Header from "../../components/Header/Header";
import AboutUs from "../../components/AboutUs/AboutUs";
import Footer from "../../components/Footer/Footer";
import Services from "../../components/Services/Services";

const Landing = () => {
  return (
    <>
      <div className="body">
        <div className="background">
          <Navbar />
          <Header />
          <AboutUs />
          <Services />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Landing;
