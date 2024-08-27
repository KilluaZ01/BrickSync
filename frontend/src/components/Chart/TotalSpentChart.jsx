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

const TotalSpentChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/fuels/total-spent-per-vehicle");
        const data = response.data;

        if (data && data.length > 0) {
          // Extract vehicle names and total spent amounts
          const vehicleNames = data.map((item) => item.vehicleName);
          const totalSpent = data.map((item) => item.totalSpent);

          setChartData({
            labels: vehicleNames,
            datasets: [
              {
                label: "Total Money Spent",
                data: totalSpent,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching total spent data", error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <p>Loading chart data...</p>;
  }

  return (
    <div className="h-full w-auto p-2">
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          indexAxis: "y", // Horizontal bar chart
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `Total Spent: Rs ${context.raw}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Total Money Spent",
              },
              beginAtZero: true,
            },
            y: {
              title: {
                display: true,
                text: "Vehicle Name",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TotalSpentChart;
