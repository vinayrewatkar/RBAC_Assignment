"use client";
import { useEffect, useState } from "react";
import { hasRole, hasPermission } from "../../../utils/rbacUtils";
import { fetchData } from "../../../utils/apiUtils";
import { ROLES, PERMISSIONS } from "../../../utils/constants";
import Header from "../../components/headers";
import Sidebar from "../../components/sideBar";
import UserTable from "../../components/userTable"; // Import the UserTable component

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user data from an API or local storage
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
      // You would likely fetch roles/permissions via API
      setRoles(["admin", "user"]); // example roles
      setPermissions(["read", "write"]); // example permissions
    }
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <main className="p-4">
          <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
          <p className="mt-2">Manage users, roles, and permissions here.</p>

          {/* Example of using role and permission checks */}
          {hasRole(roles, ROLES.ADMIN) && hasPermission(permissions, PERMISSIONS.READ) ? (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">User Management</h3>
              {/* Add the UserTable here */}
              <UserTable/>
            </div>
          ) : (
            <p className="text-red-500 mt-4">
              You do not have access to this content.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
