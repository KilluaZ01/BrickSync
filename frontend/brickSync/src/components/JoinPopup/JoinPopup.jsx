import React from "react";
import { IoClose } from "react-icons/io5";
import { FaKey } from "react-icons/fa";

const JoinPopup = ({ setShowJoin }) => {
  return (
    <div className="absolute grid z-[1] w-full h-full bg-[#00000070]">
      <form className="place-self-center w-[600px] flex flex-col gap-[20px] px-[36px] py-[40px] rounded-[8px] bg-[#2A323D] text-[#eee]">
        <div className="flex justify-between items-center">
          <h2 className="text-[26px] font-semibold">
            Join <span className="text-[#B1B500]">Business</span>
          </h2>
          <IoClose
            className="text-[26px] text-[#eee]"
            onClick={() => setShowJoin(false)}
          />
        </div>
        <div>
          <div className="flex flex-row items-center gap-3">
            <h3 className="mb-1">Business Key</h3>
          </div>

          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Enter Business Key"
            required
          />
          <div className="flex justify-center mt-3">
            <button className="flex flex-row justify-center gap-3 items-center text-sm w-full p-[0.6rem] bg-[#B1B500]  rounded-[10px] text-[#eee]">
              Done
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JoinPopup;
