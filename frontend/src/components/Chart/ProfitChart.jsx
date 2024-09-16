import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Spinner } from "flowbite-react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProfitChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/financial/getDailySummary");
        const data = await response.json();

        if (response.ok && data.data) {
          // Process the data
          const labels = data.data.map((item) => item.day);
          const ProfitData = data.data.map((item) => item.profit);

          // Set chart data
          setChartData({
            labels: labels,
            datasets: [
              {
                label: "Profit",
                data: ProfitData,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: false,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner color="success" />
      </div>
    );
  }

  return (
    <div className="h-full w-full p-2">
      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true, // Make the chart responsive
            plugins: {
              legend: {
                display: true,
                position: "top", // Legend at the top for better readability
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `${context.dataset.label}: ${context.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Amount",
                },
                beginAtZero: true,
              },
            },
            maintainAspectRatio: false, // Allow the chart to adjust with its container
          }}
          height={400}
          width={600}
        />
      )}
    </div>
  );
};

export default ProfitChart;
