import React from "react";
import { useSelector } from "react-redux";
import Display_Dashboard from "./Display/Display_Dashboard";
import Display_Inventory from "./Display/Display_Inventory";
import Display_Product from "./Display/Display_Product";
import Display_Vehicle from "./Display/Display_Vehicle";
import Display_Fuel from "./Display/Display_Fuel";
import Display_Report from "./Display/Display_Report";

const Display = () => {
  const activePage = useSelector((state) => state.navigation.activePage); // Get the active page from Redux

  return (
    <div className="bg-[#262D37] h-full w-[80%] rounded text-white">
      {activePage === "Dashboard" && <Display_Dashboard />}
      {activePage === "Inventory" && <Display_Inventory />}
      {activePage === "Product" && <Display_Product />}
      {activePage === "Vehicles" && <Display_Vehicle />}
      {activePage === "Fuel" && <Display_Fuel />}
      {activePage === "Report" && <Display_Report />}
    </div>
  );
};

export default Display;
