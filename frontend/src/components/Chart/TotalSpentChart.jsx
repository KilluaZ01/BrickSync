import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Spinner } from "flowbite-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TotalSpentChart = ({ currentUser }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          `/api/fuels/total-spent-per-vehicle?userId=${currentUser._id}`
        );
        const data = await response.json();

        if (response.ok && data.length > 0) {
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
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner color="gray" size="xl" />
      </div>
    );
  }

  return (
    <div className="h-full w-auto p-2">
      {chartData && (
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
      )}
    </div>
  );
};

export default TotalSpentChart;
