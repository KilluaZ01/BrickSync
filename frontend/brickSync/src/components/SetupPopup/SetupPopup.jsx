import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";

const SetupPopup = ({ setShowSetup }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessLocation: "",
  });
  const [key, setKey] = useState("");

  const generateKey = () => {
    const newKey = Math.random().toString(36).substring(2, 12);
    setKey(newKey);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the setup business logic, such as making a request to your backend
    console.log(formData, key);
    setShowSetup(false);
  };

  return (
    <div className="absolute grid z-[1] w-full h-full bg-[#00000070]">
      <form
        onSubmit={handleSubmit}
        className="place-self-center w-[600px] flex flex-col gap-[20px] px-[36px] py-[40px] rounded-[8px] bg-[#2A323D] text-[#eee]"
      >
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
          <h3 className="mb-1">Business Name</h3>
          <input
            className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            id="businessName"
            placeholder="Enter Business Name"
            required
            value={formData.businessName}
            onChange={handleChange}
          />
          <h3 className="mb-1">Business Location</h3>
          <input
            type="text"
            id="businessLocation"
            className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Business Location"
            required
            value={formData.businessLocation}
            onChange={handleChange}
          />
          <h3 className="mb-1">Business Key</h3>
          <div className="flex flex-row items-center gap-5 mb-1">
            <button
              type="button"
              onClick={generateKey}
              className="flex flex-row justify-center gap-3 items-center text-sm w-[200px] p-[0.6rem] bg-[#000] rounded-[10px]"
            >
              Generate Key
            </button>
            <FaRegCopy className="text-[#eee]" />
          </div>
          <p className="text-xs text-[#eeeeee90]">
            This Key enables other users to join the business.
            <span className="text-[#eee] ml-1">
              Make sure you COPY the generated key!
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex flex-row justify-center gap-3 items-center text-sm w-full p-[0.6rem] bg-[#B1B500] rounded-[10px] text-[#eee]"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupPopup;
