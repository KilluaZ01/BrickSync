import React from "react";
import { IoClose } from "react-icons/io5";

const JoinPopup = ({ setShowJoin }) => {
  return (
    <div className="absolute grid z-[1] w-full h-full bg-[#00000070]">
      <form className="place-self-center max-w-[23vw,330px] flex flex-col gap-[20px] px-[25px] py-[30px] rounded-[8px] bg-[#2A323D] text-[#eee]">
        <div className="flex justify-between items-center">
          <h2>
            Setup <span className="text-[#F8BD00]">Business</span>
          </h2>
          <IoClose onClick={() => setShowJoin(false)} />
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
        </div>
      </form>
    </div>
  );
};

export default JoinPopup;
