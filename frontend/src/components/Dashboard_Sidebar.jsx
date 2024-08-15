import React from "react";
import { MdAnalytics, MdDashboard, MdLogout, MdSettings } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaHistory, FaTruck } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";

const Dashboard_Sidebar = () => {
  return (
    <div className="bg-[#262D37] h-full w-[20%] rounded gap-3 pl-6 py-7 flex flex-col text-sm font-medium text-[#C5C6C8]">
      <div className="flex flex-row gap-4 items-center cursor-pointer">
        <MdDashboard />
        <p>Dashboard</p>
      </div>
      <div className="flex flex-row gap-4 items-center cursor-pointer">
        <FaLocationDot />
        <p>Warehouses</p>
      </div>
      <div className="flex flex-row gap-4 items-center cursor-pointer">
        <FaBoxesStacked />
        <p>Product</p>
      </div>
      <div className="flex flex-row gap-4 items-center cursor-pointer">
        <FaTruck />
        <p>Vehicles</p>
      </div>
      <div className="border-t border-[#c5c6c850] my-4 mr-6"></div>
      <div className="flex flex-row gap-4 items-center cursor-pointer">
        <MdAnalytics />
        <p>Report</p>
      </div>
      <div className="flex flex-row gap-4 items-center cursor-pointer">
        <FaHistory />
        <p>History</p>
      </div>
      <div className="border-t border-[#c5c6c850] my-4 mr-6"></div>
      <div className="flex flex-row gap-4 items-center cursor-pointer">
        <RiTeamFill />
        <p>Employees</p>
      </div>
      <div className="flex-grow"></div>
      <div className="border-t border-[#c5c6c850] my-4 mr-6"></div>
      <div className="flex flex-row gap-4 items-center cursor-pointer">
        <MdLogout />
        <p>Sign out</p>
      </div>
    </div>
  );
};

export default Dashboard_Sidebar;
