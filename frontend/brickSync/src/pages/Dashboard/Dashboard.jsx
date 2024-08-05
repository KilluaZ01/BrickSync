import React from "react";
import Dashboard_Nav from "../../components/Dashboard_Nav";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="h-screen bg-[#222831]">
      <Dashboard_Nav />
      <div className="flex">
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
