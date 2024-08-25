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

const VehicleChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/vehicles/getvehicles");
        const vehicles = response.data.vehicles;

        if (vehicles && vehicles.length > 0) {
          // Example: Count vehicles by category
          const categoryCounts = vehicles.reduce((acc, vehicle) => {
            acc[vehicle.vehCategory] = (acc[vehicle.vehCategory] || 0) + 1;
            return acc;
          }, {});

          const categories = Object.keys(categoryCounts);
          const counts = Object.values(categoryCounts);

          setChartData({
            labels: categories,
            datasets: [
              {
                label: "Vehicle Categories",
                data: counts,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 0.6)",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching vehicle data", error);
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

export default VehicleChart;
