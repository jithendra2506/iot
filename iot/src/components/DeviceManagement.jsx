import React, { useEffect, useState } from "react";

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/devices")
      .then((res) => res.json())
      .then((data) => setDevices(data))
      .catch((err) => console.error("Failed to fetch devices:", err));
  }, []);

  const confirmDelete = (device) => {
    setSelectedDevice(device);
    setShowModal(true);
  };

  const handleDeleteConfirmed = () => {
    fetch(`http://localhost:3001/api/devices/${selectedDevice.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setDevices((prev) => prev.filter((d) => d.id !== selectedDevice.id));
          setShowModal(false);
          setSelectedDevice(null);
        } else {
          alert("Failed to delete device.");
        }
      })
      .catch((err) => {
        console.error("Error deleting device:", err);
        setShowModal(false);
      });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg relative">
      <h2 className="text-xl font-semibold mb-4">Device Management</h2>

      {/* Enhanced Table */}
      <table className="min-w-full divide-y divide-gray-200 text-sm rounded overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left font-semibold tracking-wider">Device ID</th>
            <th className="px-6 py-3 text-left font-semibold tracking-wider">Name</th>
            <th className="px-6 py-3 text-left font-semibold tracking-wider">Status</th>
            <th className="px-6 py-3 text-left font-semibold tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {[...devices].sort((a, b) => a.id - b.id).map((device) => (            <tr key={device.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">{device.id}</td>
              <td className="px-6 py-4">{device.name || "Unnamed Device"}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    device.status === "online"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {device.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => confirmDelete(device)}
                  className="inline-flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium px-3 py-1.5 rounded-full transition text-sm shadow-sm"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
          {devices.length === 0 && (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                No devices found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Glassy + Bouncy Modal */}
      {showModal && selectedDevice && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-white/10">
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-xl w-[90%] max-w-md animate-bounce-in">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete device{" "}
              <span className="text-red-600 font-semibold">{selectedDevice.id}</span>? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-bounce-in {
          animation: bounceIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DeviceManagement;