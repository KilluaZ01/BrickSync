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

const LineChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch("/api/financial/getDailySummary");
        const data = await response.json();

        if (response.ok && data.data) {
          // Process the data
          const labels = data.data.map((item) => item.day);
          const revenueData = data.data.map((item) => item.revenue);
          const expensesData = data.data.map((item) => item.expenses);

          // Set chart data
          setChartData({
            labels: labels,
            datasets: [
              {
                label: "Revenue",
                data: revenueData,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: false,
              },
              {
                label: "Expenses",
                data: expensesData,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
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
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
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
            maintainAspectRatio: false, // Allow the chart to fit its container
          }}
          height={400} // Set an explicit height for the chart
          width={600} // Set an explicit width for the chart
        />
      )}
    </div>
  );
};

export default LineChart;
