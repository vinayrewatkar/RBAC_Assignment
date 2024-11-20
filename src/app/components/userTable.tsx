import React from "react";
import UserCard from "./userCard"; // Importing the UserCard component

const UserTable = () => {
  // Mock user data
  const users = [
    { id: 1, name: "John Doe", role: "Software Engineer", email: "john.doe@example.com", joined: "Jan 12, 2023", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Product Manager", email: "jane.smith@example.com", joined: "Feb 5, 2023", status: "Active" },
    { id: 3, name: "Mark Johnson", role: "UI/UX Designer", email: "mark.johnson@example.com", joined: "Mar 18, 2023", status: "Active" },
    // Add more user objects as needed
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h1 className="text-white text-2xl font-bold mb-4">User Table</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="relative">
            <UserCard />
            <div className="absolute inset-0 p-4">
              <div className="relative z-10 text-white">
                <div className="text-lg font-bold">{user.name}</div>
                <div className="text-sm text-gray-400">{user.role}</div>
                <div className="text-xs">Email: {user.email}</div>
                <div className="text-xs text-gray-500 mt-1">Joined: {user.joined}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
