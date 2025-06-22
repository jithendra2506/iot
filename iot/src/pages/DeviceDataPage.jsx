import React, { useState, useEffect } from "react";
import DeviceTable from "../components/DeviceTable";
import TemperatureChart from "../components/TemperatureChart";
import StatusSummary from "../components/StatusSummary";

const DeviceDataPage = () => {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDevices = () => {
      fetch("/api/devices")
        .then((res) => res.json())
        .then((data) => setDevices(data))
        .catch((err) => console.error("Failed to fetch devices:", err));
    };

    fetchDevices(); // Initial fetch
    const interval = setInterval(fetchDevices, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredDevices = devices.filter((device) =>
    device.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          📈 Device Dashboard
        </h1>

        <StatusSummary devices={filteredDevices} />

        <section className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <input
            type="text"
            placeholder="🔍 Search by Device ID..."
            value={searchTerm}
            onChange={handleSearch}
            className="mb-4 px-4 py-2 w-full sm:w-1/2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Search devices"
          />
          <DeviceTable devices={filteredDevices} />
        </section>

        <section className="bg-white p-6 rounded-xl shadow-lg">
          <TemperatureChart
            dataPoints={[
              { timestamp: "10:00", temp: 22 },
              { timestamp: "11:00", temp: 23 },
              { timestamp: "12:00", temp: 24 },
              { timestamp: "13:00", temp: 25 },
            ]}
          />
        </section>
      </div>
    </div>
  );
};

export default DeviceDataPage;
