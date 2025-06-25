import React, { useState, useEffect } from "react";
import DeviceTable from "../components/DeviceTable";
import TemperatureChart from "../components/TemperatureChart";
import StatusSummary from "../components/StatusSummary";

const DeviceDataPage = () => {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userEmail, setUserEmail] = useState("");
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

  const handleSendReport = () => {
    if (!userEmail || !userEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    fetch("http://localhost:3001/api/email/send-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((res) => res.text())
      .then((msg) => alert(msg))
      .catch((err) => {
        console.error("Failed to send report:", err);
        alert("Failed to send report.");
      });
  };

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

            <section className="bg-white p-6 rounded-xl shadow-lg mb-6">
              <TemperatureChart dataPoints={chartDataPoints} />
            </section>

            <section className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                📧 Send Report via Email
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
                />
                <button
                  onClick={handleSendReport}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  📤 Send Report
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default DeviceDataPage;