import React from "react";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { TbDeviceAnalytics, TbMoneybag } from "react-icons/tb";
import { PiMoney } from "react-icons/pi";

const Display_Dashboard = () => {
  return (
    <div className="h-full grid grid-cols-9 grid-rows-6 gap-2 p-2">
      <div className="col-span-3 row-span-2 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831] flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-md text-[#eeeeee77] mt-2">
            Total Revenue
          </h3>
          <TbDeviceAnalytics className="text-2xl text-green-400" />
        </div>
        <p className="font-medium text-3xl mt-1">Rs 190980</p>
        <p className="mt-auto text-xs text-[#eeeeee77] font-normal">
          <span className="text-green-400">+15% </span>from last month
        </p>
      </div>

      <div className="col-span-3 row-span-2 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831] flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-md text-[#eeeeee77] mt-2">
            Total Expenses
          </h3>
          <PiMoney className="text-2xl text-red-400" />
        </div>
        <p className="font-medium text-3xl mt-1">Rs 190980</p>
        <p className="mt-auto text-xs text-[#eeeeee77] font-normal">
          <span className="text-green-400">+15% </span>from last month
        </p>
      </div>

      <div className="col-span-3 row-span-2 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831] flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-md text-[#eeeeee77] mt-2">
            Total Profit
          </h3>
          <TbMoneybag className="text-2xl text-yellow-400" />
        </div>
        <p className="font-medium text-3xl mt-1">Rs 190980</p>
        <p className="mt-auto text-xs text-[#eeeeee77] font-normal">
          <span className="text-green-400">+15% </span>from last month
        </p>
      </div>

      <div className="col-span-2 row-span-4 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831]">
        <h3 className="font-medium text-md text-[#eee] ">Last Transaction</h3>
      </div>
      <div className="col-span-2 row-span-4 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831]">
        {/* Content for this section */}
      </div>

      <div className="col-span-2 row-span-2 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831]">
        {/* Content for this section */}
      </div>

      <div className="col-span-3 row-span-2 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831]">
        {/* Content for this section */}
      </div>
      <div className="col-span-5 row-span-2 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831]">
        {/* Content for this section */}
      </div>
    </div>
  );
};

export default Display_Dashboard;
