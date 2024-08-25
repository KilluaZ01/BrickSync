import React from "react";
import BarChart from "../Chart/BarChart";
import PriceChart from "../Chart/VerticalBarChart";
import VehicleChart from "../Chart/VehicleChart";

const Display_Dashboard = () => {
  return (
    <div className="h-full grid grid-cols-5 grid-rows-6 gap-2 p-2">
      <div className="col-span-5 row-span-2 bg-[#222831] rounded">
        <BarChart />
      </div>
      <div className="col-span-2 row-span-4 bg-[#222831] rounded">
        <PriceChart />
      </div>
      <div className="col-span-3 row-span-2 bg-[#222831] rounded">
        <VehicleChart />
      </div>
      <div className="col-span-1 row-span-2 bg-[#222831] rounded"></div>
      <div className="col-span-2 row-span-2 bg-[#222831] rounded"></div>
    </div>
  );
};

export default Display_Dashboard;
