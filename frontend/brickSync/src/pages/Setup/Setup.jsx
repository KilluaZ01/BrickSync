import React from "react";
import { assets } from "../../assets/assets";
import { HiUser, HiUserGroup } from "react-icons/hi";

const Setup = ({ setShowSetup, setShowJoin }) => {
  return (
    <div className="bg-gradient-to-r from-gray-700 to-gray-800 flex flex-col justify-center items-center h-screen gap-14">
      <div className="flex flex-col items-center">
        <img className="w-48" src={assets.logo_2} alt="Logo" />
        <h3 className="text-lg text-gray-300">
          Keeping everything synchronized
        </h3>
      </div>
      <div className="flex flex-row items-center gap-14">
        <button
          onClick={() => setShowSetup(true)}
          className="group flex flex-col text-gray-300 text-2xl font-semibold items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          <HiUser className="w-16 h-auto group-hover:text-yellow-400" />
          <span className="group-hover:text-yellow-400">Setup a Business</span>
        </button>
        <div className="h-64 w-px bg-gray-300"></div>
        <button
          onClick={() => setShowJoin(true)}
          className="group flex flex-col text-gray-300 text-2xl font-semibold items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          <HiUserGroup className="w-16 h-auto group-hover:text-yellow-400" />
          <span className="group-hover:text-yellow-400">Join a Business</span>
        </button>
      </div>
    </div>
  );
};

export default Setup;
