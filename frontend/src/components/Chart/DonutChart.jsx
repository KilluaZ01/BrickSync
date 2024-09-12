import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Spinner } from "flowbite-react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ type }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data based on the type prop
        const endpoint =
          type === "revenue"
            ? "/api/products/total-revenue"
            : "/api/total-expenses";
        const response = await axios.get(endpoint);

        const data = response.data.products || []; // Adjust this based on actual API response structure

        if (data.length > 0) {
          const labels = data.map((item) => item.name); // Adjust according to your data
          const values = data.map((item) =>
            type === "revenue" ? item.revenue : item.expenses
          ); // Use 'revenue' or 'expenses'

          setChartData({
            labels: labels,
            datasets: [
              {
                label: `${type === "revenue" ? "Revenue" : "Expenses"} Breakdown`,
                data: values,
                backgroundColor: [
                  "rgba(75, 192, 192, 0.5)",
                  "rgba(153, 102, 255, 0.5)",
                  "rgba(255, 159, 64, 0.5)",
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(54, 162, 235, 0.5)",
                ],
                borderColor: [
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                ],
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [type]);

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner color="success" />
      </div>
    );
  }

  return (
    <div className="h-auto w-auto p-2">
      <Pie data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default PieChart;
