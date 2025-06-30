import React from "react";
import { FiCpu, FiWifi, FiWifiOff } from "react-icons/fi";

const StatusSummary = ({ devices }) => {
  const total = devices.length;
  const online = devices.filter(d => d.status === "Online").length;
  const offline = devices.filter(d => d.status === "Offline").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-500 text-white p-4 rounded-xl shadow-md flex items-center gap-4">
        <FiCpu size={28} className="opacity-80" />
        <div>
          <h3 className="text-sm">Total Devices</h3>
          <p className="text-2xl font-bold">{total}</p>
        </div>
      </div>
      <div className="bg-green-500 text-white p-4 rounded-xl shadow-md flex items-center gap-4">
        <FiWifi size={28} className="opacity-80" />
        <div>
          <h3 className="text-sm">Online Devices</h3>
          <p className="text-2xl font-bold">{online}</p>
        </div>
      </div>
      <div className="bg-red-500 text-white p-4 rounded-xl shadow-md flex items-center gap-4">
        <FiWifiOff size={28} className="opacity-80" />
        <div>
          <h3 className="text-sm">Offline Devices</h3>
          <p className="text-2xl font-bold">{offline}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusSummary;