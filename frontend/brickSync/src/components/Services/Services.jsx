import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import core Swiper styles
import "swiper/css/autoplay"; // Import Autoplay module styles
import { Autoplay } from "swiper/modules"; // Correct import for Autoplay module

import inventory from "../../assets/inventory_slider.png";
import work from "../../assets/workforce_manage.png";
import vehicle from "../../assets/vehicle_management.png";
import analytics from "../../assets/realtime_analytics.png";

const images = [
  {
    title: "Inventory Management",
    src: inventory,
    description:
      "Keep track of your supplies with our advanced inventory management system. Ensure you always have the right materials at the right time.",
  },
  {
    title: "Workforce Management",
    src: work,
    description:
      "Manage your workforce efficiently with our robust tools. Track progress and optimize performance.",
  },
  {
    title: "Vehicle Management",
    src: vehicle,
    description:
      "View and manage all your vehicle details in one place. Track maintenance, schedules, and usage to optimize your fleet management.",
  },
  {
    title: "Real Time Analytics",
    src: analytics,
    description:
      "Leverage real-time data to make informed decisions and improve your operational efficiency.",
  },
];

const Services = () => {
  return (
    <div id="services">
      <h1 className="text-[48px] md:text-[72px] text-center text-[#eee] font-semibold tracking-tight mt-[100px]">
        Our Services
      </h1>
      <Swiper
        spaceBetween={30}
        slidesPerView={1} // Default slides per view
        breakpoints={{
          // Adjust slides per view based on screen width
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2000, // 3 seconds delay
          disableOnInteraction: false,
        }}
        modules={[Autoplay]} // Register Autoplay module
        className="relative h-auto mt-5" // Tailwind class for height
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center relative transition-transform duration-300"
            style={{ transform: "scale(0.8)" }} // Default size for side slides
          >
            <div className="flex flex-col w-auto h-auto bg-[#eee] rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#2E394B] text-[#eee] text-center p-5 rounded-t-lg">
                <p className="text-[24px] font-semibold">{image.title}</p>
              </div>
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto object-cover"
              />
              <div className="bg-[#2E394B] text-[#eee] text-center p-4 rounded-b-lg">
                <p className="text-md font-medium">{image.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Services;
