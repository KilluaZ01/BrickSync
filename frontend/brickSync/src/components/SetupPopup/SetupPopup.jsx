import React from "react";
import { IoClose } from "react-icons/io5";

const SetupPopup = ({ setShowSetup }) => {
  return (
    <div className="absolute grid z-[1] w-full h-full bg-[#00000070]">
      <form className="place-self-center w-[600px] flex flex-col gap-[20px] px-[36px] py-[40px] rounded-[8px] bg-[#2A323D] text-[#eee]">
        <div className="flex justify-between items-center">
          <h2 className="text-[26px] font-semibold">
            Setup <span className="text-[#B1B500]">Business</span>
          </h2>
          <IoClose
            className="text-[26px] text-[#eee]"
            onClick={() => setShowSetup(false)}
          />
        </div>
        <div>
          <input
            className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Your Business Name"
            required
          />
          <input
            type="text"
            className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Business Location"
            required
          />
          <h2 className="text-lg">Business Code</h2>
          <button className="flex flex-row justify-center gap-3 items-center text-sm w-[200px] p-[0.6rem] bg-[#000]  rounded-[10px]">
            Generate Code
          </button>
          <p className="text-xs text-[#eeeeee90]">
            This code enables other users to join the business.
            <span className="text-[#eee] ml-1">
              Make sure you COPY the generated code!
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <button className="flex flex-row justify-center gap-3 items-center text-sm w-[200px] p-[0.6rem] bg-[#B1B500]  rounded-[10px] text-[#eee]">
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupPopup;
