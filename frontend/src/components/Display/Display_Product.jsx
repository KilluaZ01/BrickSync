import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

const Display_Product = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const res = await fetch("/api/products/create", {
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
      handleClosePopup(); // Call the function here to close the popup
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="px-6 py-7">
      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Products</h1>
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
              Add Product
            </span>
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#222831] p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-[#eee] text-sm font-normal mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full text-[#222831] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter product name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#eee] text-sm font-normal mb-2">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="w-full text-[#222831] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter product description"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#eee] text-sm font-normal mb-2">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full text-[#222831] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter product price"
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="mr-4 bg-gray-300 text-gray-700 rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#B1B500] text-white rounded-lg px-4 py-2"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
              {error && (
                <p className="text-red-500 mt-2">
                  Failed to add product. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Display_Product;
