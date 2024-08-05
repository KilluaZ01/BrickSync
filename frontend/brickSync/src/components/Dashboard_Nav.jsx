import React from "react";
import { assets } from "../assets/assets";

const Dashboard_Nav = () => {
  return (
    <div className="h-full p-2 flex-col gap-2 text-white flex">
      <div className="bg-[#262D37] w-full h-[10%] rounded flex ">
        <div className="flex items-center pl-8">
          <img className="w-[80px]" src={assets.logo_1} alt="" />
        </div>
      </div>
      <div className="bg-[#262D37] h-[90%] w-[15%] rounded p-2 flex"></div>
    </div>
  );
};

export default Dashboard_Nav;
