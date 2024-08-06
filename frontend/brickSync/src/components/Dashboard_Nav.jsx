import React from "react";
import { assets } from "../assets/assets";
import Default_pfp from "../assets/Default_pfp.jpg";

const Dashboard_Nav = () => {
  return (
    <div className="w-full h-[10%] p-2">
      <div className="bg-[#262D37] w-full h-full rounded flex items-center justify-between px-6">
        <img className="w-[80px]" src={assets.logo_1} alt="" />
        <div className="flex flex-row items-center gap-4 cursor-pointer">
          <img className="rounded-full h-[25px]" src={Default_pfp} alt="" />
          <div className="flex flex-col">
            <p className="text-xs font-regular text-[#eee]">Arik Rai</p>
            <p className="text-[10px] font-regular text-[#C5C6C8]">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_Nav;
