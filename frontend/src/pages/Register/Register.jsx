import React, { useState } from "react";
import "./Register.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../components/OAuth";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.success === false) {
        setError(data.message || "Failed to create an account.");
        return;
      }

      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-row">
      {/* Left Section */}
      <div className="bgRegister-left flex flex-col w-[50%] h-[100vh] justify-center items-center">
        <Link to="/">
          <img src={assets.logo_2} alt="App Logo" />
        </Link>
        <h3>Keeping everything synchronized</h3>
      </div>

      {/* Right Section */}
      <div className="bgRegister-right flex flex-col w-[50%] h-[100vh] justify-center items-center">
        <h1 className="mb-7 text-[40px] text-[#eee] font-[600]">
          Create an Account
        </h1>
        <div className="w-[400px]">
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <input
              type="text"
              id="username"
              className="mb-3 bg-[#374151] border-none text-[#eee] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Username"
              required
              onChange={handleChange}
            />

            {/* Email Input */}
            <input
              type="email"
              id="email"
              className="mb-3 bg-[#374151] border-none text-[#eee] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Email"
              required
              onChange={handleChange}
            />

            {/* Password Input */}
            <input
              type="password"
              id="password"
              className="mb-6 bg-[#374151] border-none text-[#eee] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Password"
              required
              onChange={handleChange}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="signup-btn mb-1 text-sm"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>

            {/* Already Registered */}
            <p className="forgot flex text-[12px] justify-end">
              Already have an account?{" "}
              <Link to="/login">
                <span className="underline ml-[2px]">Login</span>
              </Link>
            </p>

            {/* Error Message */}
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

            {/* OAuth Section */}
            <div className="flex items-center mb-8 mt-3">
              <div className="flex-grow border-t border-[#ededed80] mx-4px"></div>
              <p className="forgot text-[12px] text-center mx-4">
                or sign up with
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

export default Register;
