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

    fetchDevices(); // initial fetch
    const interval = setInterval(fetchDevices, 5000); // refresh every 5 seconds
    return () => clearInterval(interval); // cleanup
  }, []);

  const chartDataPoints = devices.map((d) => ({
    timestamp: new Date(d.timestamp).toLocaleTimeString(),
    temp: d.temp,
  }));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="flex-1 p-6">
        {loading ? (
          <p className="text-gray-600">Loading chart data...</p>
        ) : (
          <>
            {view === "chart" && <TemperatureChart dataPoints={chartDataPoints} />}
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