import React from "react";

const UserList = ({ users, onSelect }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <div>
              <p className="font-bold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={() => onSelect(user)}
              className="text-blue-600 font-medium hover:underline"
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;