import React from "react";

const UserProfileCard = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">User Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p className="text-sm text-gray-500 mt-4">Note: Editing functionality can be added here later.</p>
      </div>
    </div>
  );
};

export default UserProfileCard;
