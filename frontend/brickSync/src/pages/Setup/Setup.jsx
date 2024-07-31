import React from "react";
import { assets } from "../../assets/assets";
import { HiUser } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";

const Setup = () => {
  return (
    <div className="bg-[rgba(34,40,49,1)] flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <img className="w-[200px]" src={assets.logo_2} alt="" />
        <h3 className="text-[16px] text-[#eee]">
          Keeping everything synchronized
        </h3>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col text-[#eee] text-[50px] font-semibold max-w-[250px] items-center text-center">
          <HiUser className="w-[60px] h-auto text-[#eee]" />
          Setup a Business
        </div>
        <div className="inline-block h-[250px] min-h-[1em] w-[1px] self-stretch bg-[hsla(0,0%,93%,0.8)]"></div>
        <div className="flex flex-col text-[#eee] text-[50px] font-semibold max-w-[250px] items-center text-center">
          <HiUserGroup className="w-[60px] h-auto text-[#eee]" />
          Join a Business
        </div>
      </div>
    </div>
  );
};

export default Setup;
