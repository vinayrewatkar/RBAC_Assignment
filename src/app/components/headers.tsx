import React from 'react';
import { Menu, Users, ChevronDown, LogOut, Bell } from 'lucide-react';

interface HeaderProps {
  setIsSidebarOpen: (value: boolean) => void;
  isProfileMenuOpen: boolean;
  setIsProfileMenuOpen: (value: boolean) => void;
}

const Header = ({ setIsSidebarOpen, isProfileMenuOpen, setIsProfileMenuOpen }: HeaderProps) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 lg:static lg:overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="lg:hidden px-4 text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-sm text-white hover:bg-gray-800 transition-colors focus:outline-none"
              >
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <span className="hidden md:block font-medium">Admin User</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg overflow-hidden border border-gray-700 bg-gray-800 shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={() => console.log('Logout clicked')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;