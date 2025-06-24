import React, { useState, useEffect } from "react";
import DeviceTable from "../components/DeviceTable";
import TemperatureChart from "../components/TemperatureChart";
import StatusSummary from "../components/StatusSummary";

const DeviceDataPage = () => {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = () => {
      fetch("http://localhost:3001/api/devices") 
        .then((res) => res.json())
        .then((data) => {
          setDevices(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch devices:", err);
          setLoading(false);
        });
    };

    fetchDevices(); 
    const interval = setInterval(fetchDevices, 5000);
    return () => clearInterval(interval); 
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredDevices = devices.filter((device) =>
    String(device.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartDataPoints = filteredDevices.map((d) => ({
    timestamp: new Date(d.timestamp).toLocaleTimeString(), 
    temp: d.temp,
  }));

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          📈 Device Dashboard
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading device data...</p>
        ) : (
          <>
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
              <TemperatureChart dataPoints={chartDataPoints} />
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default DeviceDataPage;