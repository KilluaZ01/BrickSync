import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Display_Inventory = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [action, setAction] = useState("restock");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products/getproducts", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching inventory data", error);
        toast.error("Error fetching inventory data");
      }
    };

    fetchProducts();
  }, []);

  const handleRestockOrSell = async () => {
    const endpoint =
      action === "restock" ? "/api/inventory/restock" : "/api/inventory/sell";
    const bodyData = {
      productId,
      quantity: parseInt(quantity, 10),
      ...(action === "restock" && { price: parseFloat(price) }),
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(
          `Product ${action === "restock" ? "restocked" : "sold"} successfully!`
        );
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === data.product._id ? data.product : product
          )
        );
      } else {
        console.error("Error:", data.message);
        toast.error(`Failed to ${action} product: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to ${action} product: ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Inventory Management</h2>

      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="mb-4 p-2 border text-slate-600"
      >
        <option value="" disabled>
          Select a Product
        </option>
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.name} (Quantity: {product.quantity})
          </option>
        ))}
      </select>

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        className="mb-4 p-2 border text-slate-600"
      />

      {action === "restock" && (
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price per Unit"
          className="mb-4 p-2 border text-slate-600"
        />
      )}

      <select
        value={action}
        onChange={(e) => setAction(e.target.value)}
        className="mb-4 p-2 border text-slate-600"
      >
        <option value="restock">Restock</option>
        <option value="sell">Sell</option>
      </select>

      <button
        onClick={handleRestockOrSell}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {action === "restock" ? "Restock Product" : "Sell Product"}
      </button>

      <table className="min-w-full divide-y mt-6 divide-gray-600 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[#B1B500] tracking-wider">
              Product Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[#B1B500] tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[#B1B500] tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[#B1B500] tracking-wider">
              Total Revenue
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[#B1B500] tracking-wider">
              Total Expenses
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-600">
          {products.map((product) => (
            <tr key={product._id} className="bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                Rs. {product.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                {product.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                Rs. {product.totalRevenue.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                Rs. {product.totalExpenses.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Display_Inventory;
