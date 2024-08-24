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

const PriceChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/products/getproducts");
        const products = response.data.products;

        if (products && products.length > 0) {
          const productNames = products.map((product) => product.name);
          const productPrices = products.map((product) => product.price);

          setChartData({
            labels: productNames,
            datasets: [
              {
                label: "Product Prices",
                data: productPrices,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 0.6)",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <p>Loading chart data...</p>;
  }

  return (
    <div className="h-full w-auto p-2">
      <Bar data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default PriceChart;
