import React from "react";

const DeviceTable = ({ devices }) => {
  return (
    <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-200">
      <table className="min-w-full table-auto text-sm text-left">
        <thead className="bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-t-xl">
          <tr>
            <th className="px-6 py-3 font-semibold">Device ID</th>
            <th className="px-6 py-3 font-semibold">Temperature (°C)</th>
            <th className="px-6 py-3 font-semibold">Humidity (%)</th>
            <th className="px-6 py-3 font-semibold">Status</th>
            <th className="px-6 py-3 font-semibold">Timestamp</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {devices && devices.length > 0 ? (
            devices.map((device, index) => (
              <tr
                key={index}
                className={`border-b transition duration-150 ease-in-out ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-3 font-medium text-gray-700">{device.id}</td>
                <td className="px-6 py-3">{device.temp}</td>
                <td className="px-6 py-3">{device.humidity}</td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      device.status === "Online"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {device.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-600">{device.timestamp}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-6 text-center text-gray-500" colSpan="5">
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