import React, { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentVehicle } from "../../redux/vehicle/vehicleSlice";
import { Modal, Button, Spinner } from "flowbite-react"; // Import Flowbite Spinner
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Display_Vehicle = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [userVehicles, setUserVehicles] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState("");
  const [vehicleIdToEdit, setVehicleIdToEdit] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(
          `/api/vehicles/getvehicles?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserVehicles(data.vehicles);
        }
      } catch (error) {
        toast.error("Failed to fetch vehicles");
        console.log(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    if (currentUser) {
      fetchVehicles();
    }
  }, [currentUser._id]);

  const handleEdit = (vehicle) => {
    dispatch(setCurrentVehicle(vehicle));
    setFormData({
      vehName: vehicle.vehName,
      vehNumber: vehicle.vehNumber,
      vehCategory: vehicle.vehCategory,
    });
    setVehicleIdToEdit(vehicle._id);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res;
      if (vehicleIdToEdit) {
        res = await fetch(
          `/api/vehicles/update/${vehicleIdToEdit}/${currentUser._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      }
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        toast.error("Failed to update vehicle");
        setError(true);
        return;
      }
      toast.success("Vehicle updated successfully");
      setUserVehicles((prev) => {
        if (vehicleIdToEdit) {
          return prev.map((vehicle) =>
            vehicle._id === vehicleIdToEdit
              ? { ...vehicle, ...formData }
              : vehicle
          );
        } else {
          return [...prev, data.vehicle];
        }
      });
      handleClosePopup();
      setShowEditModal(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update vehicle");
      setError(true);
    }
  };

  const handleEditClosePopup = () => {
    setShowPopup(false);
    setShowEditModal(false);
    setFormData({});
    setVehicleIdToEdit("");
  };

  const handleShowMore = async () => {
    const startIndex = userVehicles.length;
    try {
      const res = await fetch(
        `/api/vehicles/getvehicles?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserVehicles((prev) => [...prev, ...data.vehicles]);
        if (data.vehicles.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      toast.error("Failed to load more vehicles");
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/vehicles/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        toast.error("Failed to create vehicle");
        setError(true);
        return;
      }
      toast.success("Vehicle created successfully");
      handleClosePopup();
    } catch (error) {
      setLoading(false);
      toast.error("Failed to create vehicle");
      setError(true);
    }
  };

  const handleDeleteVehicle = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/vehicles/delete/${vehicleIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error("Failed to delete vehicle");
        console.log(data.message);
      } else {
        toast.success("Vehicle deleted successfully");
        setUserVehicles((prev) =>
          prev.filter((vehicle) => vehicle._id !== vehicleIdToDelete)
        );
      }
    } catch (error) {
      toast.error("Failed to delete vehicle");
      console.log(error.message);
    }
  };

  // Show spinner while loading
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner color="gray" size="xl" />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 flex flex-col">
      <ToastContainer />
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Vehicles</h1>
        </div>
        <div className="relative group">
          <button
            onClick={handleButtonClick}
            className="flex items-center justify-center gap-2 bg-[#B1B500] text-white rounded-lg p-2 pl-4 transition-all duration-300 ease-in-out group-hover:px-4"
          >
            <span className="flex justify-center items-center">
              <IoAddOutline size={20} />
            </span>
            <span className="font-normal text-sm overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-0 group-hover:max-w-xs">
              Add Vehicle
            </span>
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#222831] p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Vehicle</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-[#eee] text-sm font-normal mb-2">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  id="vehName"
                  className="w-full text-[#222831] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter vehicle name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#eee] text-sm font-normal mb-2">
                  Number
                </label>
                <input
                  type="vehNumber"
                  id="vehNumber"
                  className="w-full text-[#222831] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter vehicle number"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#eee] text-sm font-normal mb-2">
                  Category
                </label>
                <input
                  type="text"
                  id="vehCategory"
                  className="w-full text-[#222831] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter vehicle category"
                  onChange={handleChange}
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm mb-4">
                  Error adding vehicle. Please try again.
                </p>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg mr-4"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#B1B500] text-white px-4 py-2 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Vehicle List */}
      <div className="mt-4">
        {userVehicles.length > 0 ? (
          <div className="max-h-96 overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userVehicles.map((vehicle) => (
                <div
                  key={vehicle._id}
                  className="bg-[#222831] p-4 rounded-lg shadow-lg"
                >
                  <div className="flex flex-row justify-between">
                    <h3 className="text-lg font-semibold text-[#eee] mb-2">
                      {vehicle.vehName}
                    </h3>
                    <p className="text-sm text-[#eeeeee85]">
                      {new Date(vehicle.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-[#eeeeee85]">
                    Number: {vehicle.vehNumber}
                  </p>
                  <p className="text-sm text-[#eeeeee85]">
                    Category: {vehicle.vehCategory}
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-[#B1B500] text-white px-4 py-2 rounded-lg mr-2"
                      onClick={() => handleEdit(vehicle)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      onClick={() => {
                        setVehicleIdToDelete(vehicle._id);
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-[#ccc]">No vehicles found.</p>
        )}
      </div>

      {showMore && userVehicles.length >= 9 && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-[#B1B500] text-white px-4 py-2 rounded-lg"
            onClick={handleShowMore}
          >
            Show More
          </button>
        </div>
      )}
      {/* Edit Vehicle Modal */}
      <Modal
        show={showEditModal}
        onClose={handleEditClosePopup}
        popup
        size="md"
      >
        <Modal.Header className="bg-gray-700 rounded-t-lg" />
        <Modal.Body className="bg-gray-700 rounded-b-lg">
          <form onSubmit={handleEditSubmit}>
            <h2 className="text-xl mb-4 font-semibold text-[#eee]">
              Edit Vehicle
            </h2>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-normal mb-2">
                Vehicle Name
              </label>
              <input
                type="text"
                id="vehName"
                value={formData.vehName || ""}
                onChange={handleChange}
                className="w-full text-gray-900 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                placeholder="Enter vehicle name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-normal mb-2">
                Number
              </label>
              <input
                type="text"
                id="vehNumber"
                value={formData.vehNumber || ""}
                onChange={handleChange}
                className="w-full text-gray-900 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                placeholder="Enter vehicle number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-normal mb-2">
                Category
              </label>
              <input
                type="text"
                id="vehCategory"
                value={formData.vehCategory || ""}
                onChange={handleChange}
                className="w-full text-gray-900 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                placeholder="Enter vehicle category"
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleEditClosePopup}
                className="mr-4 bg-teal-600 text-white rounded-lg border-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#B1B500] text-white rounded-lg border-none"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
            {error && (
              <p className="text-red-500 mt-2">
                Failed to edit vehicle. Please try again.
              </p>
            )}
          </form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header className="bg-gray-700 rounded-t-lg"></Modal.Header>
        <Modal.Body className="bg-gray-700 rounded-b-lg">
          <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mx-auto mb-4" />

          <div className="text-center">
            <p className="text-[#eee] mb-5">
              Are you sure you want to delete this vehicle?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-red-600 border-none"
                onClick={handleDeleteVehicle}
              >
                Yes, I'm sure
              </Button>
              <Button
                className="bg-teal-600 border-none"
                onClick={() => setShowModal(false)}
              >
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Display_Vehicle;
