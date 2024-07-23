import React from "react";
import "./Register.css";
import { assets } from "../../assets/assets";

const Register = () => {
  return (
    <div className="flex flex-row">
      <div className="bgRegister-left flex flex-col w-[50%] h-[100vh] justify-center items-center">
        <img src={assets.logo_1} alt="" />
        <h3>Keeping everything synchronized</h3>
      </div>
      <div className="bgRegister-right flex flex-col w-[50%] h-[100vh] justify-center items-center">
        <h1 className="text-[40px] text-[#eee] font-[600]">Welcome Back!</h1>
        <div className="w-[400px]">
          <form action="submit">
            <label htmlFor="email" className="text-[#eee]">
              Email
            </label>
            <br />
            <input
              type="email"
              className="mb-3 border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email address"
              required
            />
            <label htmlFor="password" className="text-[#eee]">
              Password
            </label>
            <br />
            <input
              type="password"
              className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
            <p className="forgot underline flex text-[12px] justify-end mb-5">
              Forgot password?
            </p>
            <button className="login-btn mb-1">Login</button>
            <p className="forgot flex text-[12px] justify-end">
              Don't have an account?
              <span className="underline ml-[2px]">Register</span>
            </p>
            <p className="forgot text-[12px] text-center mb-8 mt-3">
              or login with
            </p>
            <button className="w-full mb-3 p-[0.5rem] bg-[#4267B2] text-[#eee] rounded-[10px]">
              Continue with Facebook
            </button>
            <br />
            <button className="w-full p-[0.5rem] bg-[#fff]  rounded-[10px]">
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
