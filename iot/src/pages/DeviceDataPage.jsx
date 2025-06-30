import React, { useState, useEffect } from "react";
import DeviceTable from "../components/DeviceTable";
import TemperatureChart from "../components/TemperatureChart";
import StatusSummary from "../components/StatusSummary";

const DeviceDataPage = () => {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportStatus, setReportStatus] = useState("");

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

    setReportLoading(true);
    setReportStatus("");

    fetch("http://localhost:3001/api/email/send-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((res) => res.text())
      .then(() => {
        setReportStatus(`✅ Report has been sent to ${userEmail} successfully.`);
      })
      .catch((err) => {
        console.error("Failed to send report:", err);
        setReportStatus("❌ Failed to send report.");
      })
      .finally(() => {
        setReportLoading(false);
      });
  };

  // Serial ordering by device ID
  const sortedDevices = [...devices].sort((a, b) => a.id - b.id);
  const filteredDevices = sortedDevices.filter((device) =>
    String(device.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartDataPoints = filteredDevices.map((d) => ({
    timestamp: new Date(d.timestamp).toLocaleTimeString(),
    temp: d.temp,
  }));

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">📈 Device Dashboard</h1>

        {/* Profile / Logout */}
        <div className="relative group">
          <div className="cursor-pointer px-4 py-2 bg-gray-100 rounded-full flex items-center space-x-2 group-hover:bg-gray-200 transition">
            <span className="text-sm font-medium text-gray-700">User</span>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-screen-xl mx-auto p-6">
        {loading ? (
          <p className="text-gray-600">Loading device data...</p>
        ) : (
          <>
            <StatusSummary devices={filteredDevices} />

            <section className="bg-white p-6 rounded-2xl shadow-2xl mb-6">
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

            <section className="bg-white p-6 rounded-2xl shadow-2xl mb-6">
              <TemperatureChart dataPoints={chartDataPoints} />
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-2xl">
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
                  disabled={reportLoading}
                >
                  {reportLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    "📤 Send Report"
                  )}
                </button>
              </div>
              {reportStatus && (
                <p className="mt-3 text-sm text-gray-700">{reportStatus}</p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default DeviceDataPage;