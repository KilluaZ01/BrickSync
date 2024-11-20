import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../components/OAuth";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      // Use the environment variable for the API URL
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Default to localhost if not set
      const res = await fetch(`${apiUrl}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="flex flex-row">
      <div className="bgLogin-left flex flex-col w-[50%] h-[100vh] justify-center items-center">
        <Link to="/">
          <img src={assets.logo_2} alt="" />
        </Link>
        <h3>Keeping everything synchronized</h3>
      </div>
      <div className="bgLogin-right flex flex-col w-[50%] h-[100vh] justify-center items-center">
        <h1 className="text-[40px] text-[#eee] font-[600] mb-7">
          Welcome Back!
        </h1>
        <div className="w-[400px]">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="mb-3 bg-[#374151] border-none text-[#eee] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Email"
              required
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              className="mb-6 bg-[#374151] border-none text-[#eee] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Password"
              required
              id="password"
              onChange={handleChange}
            />

            <button disabled={loading} className="login-btn mb-1 text-sm">
              {loading ? "Loading" : "Login"}
            </button>
            <p className="forgot flex text-[12px] justify-end">
              Don't have an account?
              <Link to="/signup">
                <span className="underline ml-[2px]">Register</span>
              </Link>
            </p>
            <div className="flex items-center mb-8 mt-3">
              <div className="flex-grow border-t border-[#ededed80] mx-4px"></div>
              <p className="forgot text-[12px] text-center mx-4">
                or login with
              </p>
              <div className="flex-grow border-t border-[#ededed80] mx-4px"></div>
            </div>

            <OAuth />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
