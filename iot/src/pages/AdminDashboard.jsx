import React, { useState, useEffect } from "react";
import TemperatureChart from "../components/TemperatureChart";
import UserList from "../components/UserList";
import UserProfileCard from "../components/UserProfileCard";
import DeviceManagement from "../components/DeviceManagement";
import AccessControl from "../components/AccessControl";
import SupportResources from "../components/SupportResources";

const mockUsers = [
  {
    id: "user01",
    name: "Jithendra Varma",
    email: "jithendra@gmail.com",
    role: "User",
  },
  {
    id: "user02",
    name: "Harshit",
    email: "Harshit@gmail.com",
    role: "User",
  },
  {
    id: "user03",
    name: "Abhay",
    email: "Abhay@gmail.com",
    role: "User",
  },
];

const AdminDashboard = () => {
  const [view, setView] = useState("chart");
  const [selectedUser, setSelectedUser] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [reportStatus, setReportStatus] = useState("");
  const [reportLoading, setReportLoading] = useState(false);

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

  const chartDataPoints = [...devices]
    .sort((a, b) => parseInt(a.id) - parseInt(b.id)) // ✅ Sorted by device ID
    .map((d) => ({
      timestamp: `ID ${d.id}`, // Use ID on x-axis instead of time
      temp: d.temp,
    }));

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      <aside className="bg-white w-full lg:w-64 p-6 shadow-xl border-r">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <button onClick={() => setView("chart")} className="text-left w-full text-blue-600 hover:underline">
            📈 Temperature Chart
          </button>
          <button onClick={() => { setSelectedUser(null); setView("users"); }} className="text-left w-full text-blue-600 hover:underline">
            👥 Manage Users
          </button>
          <button onClick={() => setView("devices")} className="text-left w-full text-blue-600 hover:underline">
            🖥️ Device Management
          </button>
          <button onClick={() => setView("access")} className="text-left w-full text-blue-600 hover:underline">
            🔐 Access Control
          </button>
          <button onClick={() => setView("support")} className="text-left w-full text-blue-600 hover:underline">
            📞 Support Resources
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 relative">
        <div className="absolute top-4 right-6 z-50">
          <div className="relative group">
            <div className="cursor-pointer px-4 py-2 bg-white border rounded-full flex items-center space-x-2 group-hover:bg-gray-100 shadow-md transition">
              <span className="text-sm font-medium text-gray-700">Admin</span>
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

        {loading ? (
          <p className="text-gray-600">Loading chart data...</p>
        ) : (
          <>
            {view === "chart" && (
              <>
                <TemperatureChart dataPoints={chartDataPoints} />

                <section className="bg-white mt-6 p-6 rounded-xl shadow-lg">
                  <h2 className="text-lg font-semibold mb-2 text-gray-700">
                    📧 Send Report via Email
                  </h2>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <input
                      type="email"
                      placeholder="Enter recipient email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
                    />
                    <button
                      onClick={handleSendReport}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
                    >
                      {reportLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>📤 Send Report</>
                      )}
                    </button>
                  </div>
                  {reportStatus && (
                    <p className="mt-2 text-sm text-gray-700">{reportStatus}</p>
                  )}
                </section>

                <section className="bg-white mt-6 p-6 rounded-xl shadow-lg">
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">📦 Device Overview</h2>
                  <div className="mb-4 text-gray-800 text-md">
                    Total Devices: <span className="font-bold">{devices.length}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                      <thead className="bg-gray-800 text-white">
                        <tr>
                          <th className="px-4 py-2">Device ID</th>
                          <th className="px-4 py-2">Temperature (°C)</th>
                          <th className="px-4 py-2">Humidity (%)</th>
                          <th className="px-4 py-2">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {[...devices]
                          .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                          .map((device) => (
                            <tr key={device.id} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2">{device.id}</td>
                              <td className="px-4 py-2">{device.temp}</td>
                              <td className="px-4 py-2">{device.humidity}</td>
                              <td className="px-4 py-2">{new Date(device.timestamp).toLocaleString()}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            )}

            {view === "users" && selectedUser === null && (
              <UserList users={mockUsers} onSelect={(user) => setSelectedUser(user)} />
            )}
            {view === "users" && selectedUser && (
              <UserProfileCard user={selectedUser} />
            )}
            {view === "devices" && <DeviceManagement />}
            {view === "access" && <AccessControl users={mockUsers} />}
            {view === "support" && <SupportResources />}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;