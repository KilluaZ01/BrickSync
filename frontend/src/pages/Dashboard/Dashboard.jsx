import React from "react";
import Dashboard_Nav from "../../components/Dashboard_Nav";
import Display from "../../components/Display";
import Dashboard_Sidebar from "../../components/Dashboard_Sidebar";

const Dashboard = () => {
  return (
    <div className="h-screen bg-[#222831] flex flex-col">
      <Dashboard_Nav />
      <div className="flex flex-row h-[90%] px-2 pb-2 gap-2">
        <Dashboard_Sidebar />
        <Display />
      </div>
    </div>
  );
};

export default Dashboard;
