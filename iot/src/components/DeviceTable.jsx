import React from "react";

const DeviceTable = ({ devices }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full table-auto text-sm text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Device ID</th>
            <th className="px-4 py-2">Temperature (°C)</th>
            <th className="px-4 py-2">Humidity (%)</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {devices && devices.length > 0 ? (
            devices.map((device, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{device.id}</td>
                <td className="px-4 py-2">{device.temp}</td>
                <td className="px-4 py-2">{device.humidity}</td>
                <td className={`px-4 py-2 ${device.status === 'Online' ? 'text-green-600' : 'text-red-600'}`}>
                  {device.status}
                </td>
                <td className="px-4 py-2">{device.timestamp}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-4 text-center text-gray-500" colSpan="5">
                No device data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceTable;