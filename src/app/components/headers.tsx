import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">RBAC Admin Dashboard</h1>
        <button className="bg-red-600 px-4 py-2 rounded">Logout</button>
      </div>
    </header>
  );
};

export default Header;
