import React from "react";
import { assets } from "../assets/assets";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard_Nav = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[10%] p-2">
      <div className="bg-[#262D37] w-full h-full rounded flex items-center justify-between px-6">
        <Link to="/Dashboard">
          <img className="w-[80px]" src={assets.logo_1} alt="" />
        </Link>
        <Link to="/profile">
          <div className="flex flex-row items-center gap-4 cursor-pointer">
            <img
              className="rounded-full h-[25px] w-[25px] object-cover"
              src={currentUser.profilePicture}
            />

            <div className="flex flex-col">
              <p className="text-sm font-regular text-[#eee]">
                {currentUser.username}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard_Nav;
