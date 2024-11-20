// Sidebar.tsx
import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-700 text-white p-4">
      <ul>
        <li>
          <Link href="../pages/dashboard" className="block p-2 hover:bg-gray-600">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="../pages/users" className="block p-2 hover:bg-gray-600">
            Users
          </Link>
        </li>
        <li>
          <Link href="../pages/roles" className="block p-2 hover:bg-gray-600">
            Roles
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
