import React from "react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleSidebar} 
            className="mr-4 focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold">RBAC Admin Dashboard</h1>
        </div>
        <button className="bg-red-600 px-4 py-2 rounded">Logout</button>
      </div>
    </header>
  );
};

export default Header;