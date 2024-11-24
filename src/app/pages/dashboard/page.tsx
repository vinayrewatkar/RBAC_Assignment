"use client";
import React, { useState, useEffect } from "react";
import { Filter, Download } from "lucide-react";
import UserTable from "../../components/userTable";
import DashboardStats from "../../components/dashboardStats";
import { UserType } from "../../../types/type";
import { useUsers } from "../../../store/userContext";
import { useRoles } from "../../../store/rolesContext";
import { UserProvider } from "../../../store/userContext";
import { RolesProvider } from "../../../store/rolesContext";

const DashboardContent: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const { users } = useUsers(); // From User Context
  const { roles } = useRoles(); // From Roles Context
  const [selectedRole, setSelectedRole] = useState("all");
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);

  // Get current user from localStorage
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  // Update filtered users dynamically
  useEffect(() => {
    if (selectedRole === "all") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user.roleId === selectedRole);
      setFilteredUsers(filtered);
    }
  }, [selectedRole, users]);

  // Count active and inactive users
  const activeUsers = users.filter((user) => user.isActive).length;
  const inactiveUsers = users.length - activeUsers;

  // Export user data as CSV
  const handleExport = () => {
    const exportData = filteredUsers.map((user) => ({
      name: user.name,
      email: user.email,
      role: roles.find((r) => r.id === user.roleId)?.name || user.role,
      status: user.isActive ? "Active" : "Inactive",
      joinedDate: user.joinedDate,
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(exportData[0]).join(",") +
      "\n" +
      exportData.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            Welcome back, {user?.name || "Guest"}!
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your users today.
          </p>
        </div>

        {/* Stats Section */}
        <DashboardStats
          totalUsers={users.length}
          activeUsers={activeUsers}
          inactiveUsers={inactiveUsers}
        />

        {/* Filters and Actions Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <label className="text-gray-400 mr-2">Filter by Role:</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Export Users</span>
          </button>
        </div>

        {/* Users Table Section */}
        <div className="bg-black rounded-lg shadow-xl">
          <UserTable users={filteredUsers} />
        </div>
      </div>
    </div>
  );
};

// Wrap the DashboardContent with Providers
const Dashboard: React.FC = () => {
  return (
    <RolesProvider>
      <UserProvider>
        <DashboardContent />
      </UserProvider>
    </RolesProvider>
  );
};

export default Dashboard;
