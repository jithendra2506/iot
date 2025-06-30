import React from "react";

const SupportResources = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Support Resources</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>📧 Contact support at <strong>reports.ideabytes@gmail.com</strong></li>
        <li>📘 Read the <a href="#" className="text-blue-600 underline">User Guide</a></li>
        <li>🛠️ Access the <a href="#" className="text-blue-600 underline">Developer API Docs</a></li>
        <li>💡 Check FAQs or troubleshooting steps in the <a href="#" className="text-blue-600 underline">Help Center</a></li>
      </ul>
    </div>
  );
};

export default SupportResources;