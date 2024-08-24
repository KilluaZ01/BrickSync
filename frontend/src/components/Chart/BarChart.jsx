import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/products/getproducts");
        const products = response.data.products;

        if (products && products.length > 0) {
          const productNames = products.map((product) => product.name);
          const productQuantities = products.map((product) => product.quantity);

          setChartData({
            labels: productNames,
            datasets: [
              {
                label: "Product Quantities",
                data: productQuantities,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
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
    <div className="h-auto w-auto p-2">
      <Line data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default BarChart;
