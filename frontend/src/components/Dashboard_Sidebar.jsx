import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePage } from "../redux/navigation/navigationSlice"; // Import the action
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Dashboard_Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeItem = useSelector((state) => state.navigation.activePage); // Get the active page from Redux

  const handleSignOut = async () => {
    try {
      await fetch("api/auth/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemClick = (item) => {
    dispatch(setActivePage(item)); // Dispatch the action to update the active page in Redux
  };

  return (
    <div className="bg-[#262D37] h-full w-[20%] rounded gap-3 pl-6 py-7 flex flex-col text-sm font-medium text-[#C5C6C8]">
      <div
        className={`flex flex-row gap-4 items-center cursor-pointer ${
          activeItem === "Dashboard" ? "text-[#F8BD00]" : ""
        }`}
        onClick={() => handleItemClick("Dashboard")}
      >
        <p>Dashboard</p>
      </div>
      <div
        className={`flex flex-row gap-4 items-center cursor-pointer ${
          activeItem === "Inventory" ? "text-[#F8BD00]" : ""
        }`}
        onClick={() => handleItemClick("Inventory")}
      >
        <p>Inventory</p>
      </div>
      <div
        className={`flex flex-row gap-4 items-center cursor-pointer ${
          activeItem === "Product" ? "text-[#F8BD00]" : ""
        }`}
        onClick={() => handleItemClick("Product")}
      >
        <p>Product</p>
      </div>
      <div
        className={`flex flex-row gap-4 items-center cursor-pointer ${
          activeItem === "Vehicles" ? "text-[#F8BD00]" : ""
        }`}
        onClick={() => handleItemClick("Vehicles")}
      >
        <p>Vehicles</p>
      </div>
      <div className="border-t border-[#c5c6c850] my-4 mr-6"></div>
      <div
        className={`flex flex-row gap-4 items-center cursor-pointer ${
          activeItem === "Report" ? "text-[#F8BD00]" : ""
        }`}
        onClick={() => handleItemClick("Report")}
      >
        <p>Report</p>
      </div>
      <div
        className={`flex flex-row gap-4 items-center cursor-pointer ${
          activeItem === "History" ? "text-[#F8BD00]" : ""
        }`}
        onClick={() => handleItemClick("History")}
      >
        <p>History</p>
      </div>
      <div className="flex-grow"></div>
      <div className="border-t border-[#c5c6c850] my-4 mr-6"></div>
      <div
        className={`flex flex-row gap-4 items-center cursor-pointer ${
          activeItem === "Sign out" ? "text-[#F8BD00]" : ""
        }`}
        onClick={handleSignOut}
      >
        <p>Sign out</p>
      </div>
    </div>
  );
};

export default Dashboard_Sidebar;
