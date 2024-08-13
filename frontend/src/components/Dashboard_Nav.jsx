import React from "react";
import { assets } from "../assets/assets";
import Default_pfp from "../assets/Default_pfp.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard_Nav = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[10%] p-2">
      <div className="bg-[#262D37] w-full h-full rounded flex items-center justify-between px-6">
        <img className="w-[80px]" src={assets.logo_1} alt="" />
        <div className="flex flex-row items-center gap-4 cursor-pointer">
          <img className="rounded-full h-[25px]" src={Default_pfp} alt="" />
          <div className="flex flex-col">
            <Link to="/profile">
              <p className="text-sm font-regular text-[#eee]">
                {currentUser.username}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_Nav;
