import { Modal, Button } from "flowbite-react";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import PriceChart from "./Chart/VerticalBarChart";

const FuelStatus = () => {
  const [addFuelModal, setAddFuelModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleAddFuel = () => {
    setAddFuelModal(true);
  };

  const handleClosePopup = () => {
    setAddFuelModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAddFuelSubmit = () => {};

  return (
    <div className="h-full px-6 py-7 flex flex-col">
      <div className="flex flex-row justify-between mb-4">
        <div>
          <h1 className="font-semibold text-2xl">Fuel Info</h1>
        </div>
        <div className="relative group">
          <button
            onClick={handleAddFuel}
            className="flex items-center justify-center gap-2 bg-[#B1B500] text-white rounded-lg p-2 pl-4 transition-all duration-300 ease-in-out group-hover:px-4"
          >
            <span className="flex justify-center items-center">
              <IoAddOutline size={20} />
            </span>
            <span className="font-normal text-sm overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-0 group-hover:max-w-xs">
              Add Fuel Info
            </span>
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 lg:grid-rows-4 grid-cols-1 gap-4 h-full">
        <div className="bg-[#222831] p-4 rounded-lg shadow-lg lg:col-span-1 lg:row-span-4 col-span-1 row-span-1 flex flex-col">
          <div className="">
            <p className="text-sm text-[#eeeeee85]"></p>
            <p className="text-[#eee] mb-2 text-base">2024/12/30</p>
            <p className="text-sm text-[#eeeeee85]">Vehicle Name:</p>
            <p className="text-sm text-[#eeeeee85]">Fuel Quantity:</p>
            <p className="text-sm text-[#eeeeee85]">Amount Paid:</p>
          </div>
        </div>
        <div className="bg-[#222831] p-4 rounded-lg shadow-lg lg:col-span-3 lg:row-span-4 col-span-1 row-span-1 hidden lg:block">
          <PriceChart />
        </div>
      </div>
      <Modal show={addFuelModal} onClose={handleClosePopup} popup size="md">
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#222831] p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-[#eee]">
              Add Fuel to Vehicle
            </h2>
            <form onSubmit={handleAddFuelSubmit}>
              <div className="mb-4">
                <label className="block text-[#eee] text-sm font-normal mb-2">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  id="vehName"
                  value={formData.vehName || ""}
                  onChange={handleChange}
                  className="w-full text-[#222831] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter vehicle name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#eee] text-sm font-normal mb-2">
                  Fuel Quantity
                </label>
                <input
                  type="number"
                  id="fuelQuantity"
                  value={formData.fuelQuantity || ""}
                  onChange={handleChange}
                  className="w-full text-[#222831] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter fuel quantity"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#eee] text-sm font-normal mb-2">
                  Fuel Price
                </label>
                <input
                  type="text"
                  id="fuelPrice"
                  value={formData.fuelPrice || ""}
                  onChange={handleChange}
                  className="w-full text-[#222831] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter fuel price"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleClosePopup}
                  className="bg-red-600 text-white px-4 border-none py-2 rounded-lg mr-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#B1B500] text-white border-none px-4 py-2 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Fuel"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FuelStatus;
