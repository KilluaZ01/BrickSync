import React, { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentProduct } from "../../redux/product/productSlice";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Display_Product = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [productIdToEdit, setProductIdToEdit] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentProduct } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products/getproducts?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserProducts(data.products);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchProducts();
    }
  }, [currentUser._id]);

  const handleEdit = (product) => {
    dispatch(setCurrentProduct(product));
    setFormData({
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res;
      if (productIdToEdit) {
        res = await fetch(
          `/api/products/update/${productIdToEdit}/${currentUser._id}`,
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
        setError(true);
        toast.error("Failed to update product.");
        return;
      }
      setUserProducts((prev) => {
        if (productIdToEdit) {
          return prev.map((product) =>
            product._id === productIdToEdit
              ? { ...product, ...formData }
              : product
          );
        } else {
          return [...prev, data.product];
        }
      });
      handleClosePopup();
      setShowEditModal(false);
      toast.success("Product updated successfully!");
    } catch (error) {
      setLoading(false);
      setError(true);
      toast.error("Error updating product.");
    }
  };

  const handleEditClosePopup = () => {
    setShowPopup(false);
    setShowEditModal(false);
    setFormData({});
    setProductIdToEdit("");
  };

  const handleShowMore = async () => {
    const startIndex = userProducts.length;
    try {
      const res = await fetch(
        `/api/products/getproducts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserProducts((prev) => [...prev, ...data.products]);
        if (data.products.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error loading more products.");
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
        toast.error("Failed to add product.");
        return;
      }
      handleClosePopup();
      toast.success("Product added successfully!");
    } catch (error) {
      setLoading(false);
      setError(true);
      toast.error("Error adding product.");
    }
  };

  const handleDeleteProduct = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/products/delete/${productIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        toast.error("Failed to delete product.");
      } else {
        setUserProducts((prev) =>
          prev.filter((product) => product._id !== productIdToDelete)
        );
        toast.success("Product deleted successfully!");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error deleting product.");
    }
  };

  return (
    <div className="px-6 py-7 flex flex-col">
      <ToastContainer />
      <div className="flex flex-row justify-between">
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
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  className="w-full text-[#222831] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter product quantity"
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
                  disabled={loading}
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
      {userProducts.length > 0 ? (
        <table className="min-w-full divide-y mt-6 divide-gray-600 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#B1B500] tracking-wider rounded-tl-lg">
                Date Updated
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-[#B1B500] tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#B1B500] tracking-wider">
                Product Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#B1B500] tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#B1B500] tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#B1B500] tracking-wider">
                Delete
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#B1B500]  tracking-wider rounded-tr-lg">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-600">
            {userProducts.map((product) => (
              <tr key={product._id} className="bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                  {new Date(product.updatedAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                  {product.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                  Rs. {product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-500 hover:underline cursor-pointer">
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setProductIdToDelete(product._id);
                    }}
                  >
                    Delete
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hover:underline cursor-pointer text-sm font-medium text-teal-500">
                  <span
                    onClick={() => {
                      setProductIdToEdit(product._id);
                      handleEdit(product);
                    }}
                  >
                    Edit
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Product Available!</p>
      )}
      {showMore && (
        <button
          onClick={handleShowMore}
          className="mt-4 text-teal-100 text-sm px-4 py-2"
        >
          Show More
        </button>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="bg-red-600" onClick={handleDeleteProduct}>
                Yes, I'm sure
              </Button>
              <Button
                className="bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div>
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-normal mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  defaultValue={currentProduct.name}
                  id="name"
                  className="w-full text-gray-900 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter product name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-normal mb-2">
                  Description
                </label>
                <input
                  type="text"
                  defaultValue={currentProduct.description}
                  id="description"
                  className="w-full text-gray-900 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter product description"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-normal mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  defaultValue={currentProduct.quantity}
                  id="quantity"
                  className="w-full text-gray-900 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter product quantity"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-normal mb-2">
                  Price
                </label>
                <input
                  type="number"
                  defaultValue={currentProduct.price}
                  id="price"
                  className="w-full text-gray-900 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B1B500]"
                  placeholder="Enter product price"
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="mr-4 bg-gray-300 text-gray-700 rounded-lg px-4 py-2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#B1B500] text-white rounded-lg px-4 py-2"
                  disabled={loading}
                >
                  {loading ? "Edting..." : "Edited"}
                </Button>
              </div>
              {error && (
                <p className="text-red-500 mt-2">
                  Failed to edit product. Please try again.
                </p>
              )}
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Display_Product;
