// Sidebar.tsx
import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-black text-white p-4">
      <ul>
        <li>
          <Link href="../pages/dashboard" className="block p-2 hover:bg-black">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="../pages/users" className="block p-2 hover:bg-black">
            Users
          </Link>
        </li>
        <li>
          <Link href="../pages/roles" className="block p-2 hover:bg-black">
            Roles
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
