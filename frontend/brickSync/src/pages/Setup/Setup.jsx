import React from "react";
import { assets } from "../../assets/assets";
import { HiUser } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";

const Setup = ({ setShowSetup, setShowJoin }) => {
  return (
    <div className="bg-[linear-gradient(90deg,rgba(57,62,70,1)_0%,rgba(34,40,49,1)_100%)] flex flex-col justify-center items-center h-screen gap-[60px]">
      <div className="flex flex-col items-center">
        <img className="w-[200px]" src={assets.logo_2} alt="" />
        <h3 className="text-[16px] text-[#eee]">
          Keeping everything synchronized
        </h3>
      </div>
      <div className="flex flex-row items-center gap-[60px]">
        <button
          onClick={() => setShowSetup(true)}
          className="group flex flex-col text-[#eee] text-[30px] font-semibold max-w-[190px] items-center text-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <HiUser className="w-[60px] h-auto text-[#eee] group-hover:text-[#F8BD00]" />
          <span className="group-hover:text-[#F8BD00]">Setup a Business</span>
        </button>
        <div className="inline-block h-[250px] min-h-[1em] w-[1px] self-stretch bg-[hsla(0,0%,93%,0.8)]"></div>
        <button
          onClick={() => setShowJoin(true)}
          className="group flex flex-col text-[#eee] text-[30px] font-semibold max-w-[190px] items-center text-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <HiUserGroup className="w-[60px] h-auto text-[#eee] group-hover:text-[#F8BD00]" />
          <span className="group-hover:text-[#F8BD00]">Join a Business</span>
        </button>
      </div>
    </div>
  );
};

export default Setup;
