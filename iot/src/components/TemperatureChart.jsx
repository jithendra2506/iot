import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const TemperatureChart = ({ dataPoints }) => {
  const chartRef = useRef();

  const data = {
    labels: dataPoints.map((point) => point.timestamp),
    datasets: [
      {
        label: "Temperature (°C)",
        data: dataPoints.map((point) => point.temp),
        fill: false,
        borderColor: "rgb(59, 130, 246)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: "#374151", // optional: tailwind gray-700
        },
      },
      x: {
        ticks: {
          color: "#374151",
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">
        Temperature Over Time
      </h2>
      <div ref={chartRef}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TemperatureChart;