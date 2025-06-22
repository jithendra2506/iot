import React from "react";

const DeviceManagement = () => {
  const devices = [
    { id: "D-101", name: "Sensor A", status: "Online" },
    { id: "D-102", name: "Sensor B", status: "Offline" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Device Management</h2>
      <table className="min-w-full table-auto text-left text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Device ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{device.id}</td>
              <td className="px-4 py-2">{device.name}</td>
              <td className={`px-4 py-2 ${device.status === 'Online' ? 'text-green-600' : 'text-red-600'}`}>{device.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceManagement;
