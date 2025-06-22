import React, { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import emailjs from "emailjs-com";
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
  const [email, setEmail] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

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
    scales: { y: { beginAtZero: false } },
  };

  const handleSend = async () => {
    if (!email) {
      setStatusMsg("❌ Please enter an email.");
      return;
    }

    try {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 100);

      const pdfBlob = pdf.output("blob");

      const formData = new FormData();
      formData.append("file", pdfBlob, "report.pdf");

      // Send using emailjs
      const result = await emailjs.send(
        "your_service_id",
        "your_template_id",
        {
          to_email: email,
        },
        "your_user_id"
      );

      setStatusMsg("✅ Report sent successfully!");
    } catch (error) {
      console.error("Failed to send report:", error);
      setStatusMsg("❌ Failed to send report. Try again.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">
        Temperature Over Time
      </h2>

      <div ref={chartRef}>
        <Line data={data} options={options} />
      </div>

      <div className="mt-4 space-y-2">
        <input
          type="email"
          placeholder="Enter email to send report"
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          📤 Send Report
        </button>
        <p className="text-sm text-gray-600 mt-1">{statusMsg}</p>
      </div>
    </div>
  );
};

export default TemperatureChart;