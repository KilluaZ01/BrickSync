import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StockAlertChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { data } = await axios.get("/api/products/getproducts");
        const { products } = data;

        if (products && products.length > 0) {
          // Sort products by quantity in ascending order
          const sortedProducts = products.sort(
            (a, b) => a.quantity - b.quantity
          );

          // Select the top 5 products with the lowest quantity
          const top5Products = sortedProducts.slice(0, 5);
          const productNames = top5Products.map((product) => product.name);
          const productQuantities = top5Products.map(
            (product) => product.quantity
          );

          const lowStockThreshold = 20;

          setChartData({
            labels: productNames,
            datasets: [
              {
                label: "Product Quantities",
                data: productQuantities,
                backgroundColor: productQuantities.map((quantity) =>
                  quantity < lowStockThreshold
                    ? "rgba(255, 99, 132, 0.6)"
                    : "rgba(75, 192, 192, 0.6)"
                ),
                borderColor: productQuantities.map((quantity) =>
                  quantity < lowStockThreshold
                    ? "rgba(255, 99, 132, 1)"
                    : "rgba(75, 192, 192, 1)"
                ),
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    fetchProductData();
  }, []);

  if (!chartData) {
    return <p>Loading chart data...</p>;
  }

  return (
    <div className="h-full w-full">
      <Bar
        data={chartData}
        options={{
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {},
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default StockAlertChart;
