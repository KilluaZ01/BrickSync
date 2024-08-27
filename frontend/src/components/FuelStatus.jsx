import { Modal, Button } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import TotalSpentChart from "./Chart/TotalSpentChart";

const FuelStatus = () => {
  const [addFuelModal, setAddFuelModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [fuels, setFuels] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  const handleAddFuel = () => {
    setAddFuelModal(true);
  };

  const handleClosePopup = () => {
    setAddFuelModal(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "vehicleId") {
      const selectedVehicle = vehicles.find((vehicle) => vehicle._id === value);
      setFormData({
        ...formData,
        vehicleId: selectedVehicle._id,
        vehicleName: selectedVehicle.vehName,
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  // Fetch vehicles when the modal opens
  useEffect(() => {
    if (addFuelModal) {
      const fetchVehicles = async () => {
        try {
          const response = await fetch(
            `/api/vehicles/getvehicles?userId=${currentUser._id}`
          );
          const data = await response.json();
          setVehicles(data.vehicles);
        } catch (error) {
          console.error("Error fetching vehicles", error);
        }
      };

      fetchVehicles();
    }
  }, [addFuelModal, currentUser._id]);

  // Fetch fuel data
  useEffect(() => {
    const fetchFuels = async () => {
      try {
        const response = await fetch(
          `/api/fuels/getFuels?userId=${currentUser._id}`
        );
        const data = await response.json();
        if (response.ok) {
          setFuels(data.fuels);
        }
      } catch (error) {
        console.error("Error fetching fuels", error);
      }
    };

    if (currentUser) {
      fetchFuels();
    }
  }, [currentUser._id]);

  const handleAddFuelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fuelData = {
        vehicleId: formData.vehicleId,
        vehicleName: formData.vehicleName,
        fuelQuantity: formData.fuelQuantity,
        fuelPrice: formData.fuelPrice,
      };

      const response = await fetch("/api/fuels/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fuelData),
      });

      if (!response.ok) {
        throw new Error("Error adding fuel data");
      }

      setAddFuelModal(false);
      setFormData({});
    } catch (error) {
      console.error("Error adding fuel data", error);
      alert("Error adding fuel data");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="bg-[#222831] p-4 rounded-lg shadow-lg lg:col-span-1 lg:row-span-4 col-span-1 row-span-1 flex flex-col overflow-y-auto scroll-hidden">
          {fuels.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto no-scrollbar">
              {fuels.map((fuel) => (
                <div
                  key={fuel._id}
                  className="bg-[#333] p-4 rounded-lg shadow-lg"
                >
                  <div className="flex flex-col">
                    <p className="text-sm text-[#eeeeee85]">Date:</p>
                    <p className="text-[#eee] mb-2 text-base">
                      {new Date(fuel.updatedAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-[#eeeeee85]">Vehicle Name:</p>
                    <p className="text-[#eee] mb-2 text-base">
                      {fuel.vehicleId ? fuel.vehicleId.vehName : "N/A"}
                    </p>
                    <p className="text-sm text-[#eeeeee85]">Fuel Quantity:</p>
                    <p className="text-[#eee] mb-2 text-base">
                      {fuel.fuelQuantity || "N/A"}
                    </p>
                    <p className="text-sm text-[#eeeeee85]">Amount Paid:</p>
                    <p className="text-[#eee] mb-2 text-base">
                      {fuel.fuelPrice || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#ccc]">No fuel records found.</p>
          )}
        </div>

        <div className="bg-[#222831] p-4 rounded-lg shadow-lg lg:col-span-3 lg:row-span-4 col-span-1 row-span-1 hidden lg:block">
          <TotalSpentChart />
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
                <select
                  id="vehicleId"
                  value={formData.vehicleId || ""}
                  onChange={handleChange}
                  className="w-full text-[#222831] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                >
                  <option value="" disabled>
                    Select a vehicle
                  </option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>
                      {vehicle.vehName}
                    </option>
                  ))}
                </select>
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
