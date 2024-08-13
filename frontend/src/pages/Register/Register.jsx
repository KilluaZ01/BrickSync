import React, { useState } from "react";
import "./Register.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../components/OAuth";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="bgRegister-left flex flex-col w-[50%] h-[100vh] justify-center items-center">
        <Link to="/">
          <img src={assets.logo_2} alt="" />
        </Link>
        <h3>Keeping everything synchronized</h3>
      </div>
      <div className="bgRegister-right flex flex-col w-[50%] h-[100vh] justify-center items-center">
        <h1 className=" mb-7 text-[40px] text-[#eee] font-[600]">
          Create an Account
        </h1>
        <div className="w-[400px]">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="mb-3 border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              id="username"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              className="mb-3 border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              required
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              className="mb-3 border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password"
              required
              id="password"
              onChange={handleChange}
            />
            <button disabled={loading} className="signup-btn mb-1 text-sm">
              {loading ? "Loading" : "Signup"}
            </button>
            <p className="forgot flex text-[12px] justify-end">
              Already have an account?
              <Link to="/login">
                <span className="underline ml-[2px]">Login</span>
              </Link>
            </p>
            <p className="text-orange-300 text-sm">
              {error && "Something went wrong!"}
            </p>
            <div className="flex items-center mb-8 mt-3">
              <div className="flex-grow border-t border-[#ededed80] mx-4px"></div>
              <p className="forgot text-[12px] text-center mx-4">
                or sign up with
              </p>
              <div className="flex-grow border-t border-[#ededed80] mx-4px"></div>
            </div>
            <button className="flex flex-row justify-center gap-3 items-center text-sm w-full mb-3 p-[0.6rem] bg-[#4267B2] text-[#eee] rounded-[10px] ">
              <img className="w-5" src={assets.facebook_icon1} alt="" />
              Sign Up with Facebook
            </button>
            <OAuth />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
