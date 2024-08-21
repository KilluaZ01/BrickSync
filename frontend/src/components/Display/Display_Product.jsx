import React from "react";
import { IoAddOutline } from "react-icons/io5";

const Display_Product = () => {
  return (
    <div className="px-6 py-7">
      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Products</h1>
        </div>
        <div className="relative group">
          <button className="flex items-center justify-center gap-2 bg-[#B1B500] text-white rounded-lg p-2 pl-4 transition-all duration-300 ease-in-out group-hover:px-4">
            <span className="flex justify-center items-center">
              <IoAddOutline size={20} />
            </span>
            <span className="font-normal text-sm overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-0 group-hover:max-w-xs">
              Add Product
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Display_Product;
