"use client"
import React, { useState, useEffect } from 'react';
import Header from '../../components/headers';
import Sidebar from '../../components/sideBar';
import UserTable from '../../components/userTable';
import { UserProvider } from '../../../store/userContext';

import { UserType } from '../../../types/type';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  return (
    <UserProvider>
      <div className="flex h-screen bg-black">
      
        <div className="flex-1 flex flex-col overflow-hidden">
          
          <main className="flex-1 overflow-auto p-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">
                  Welcome back, {user?.name || 'Guest'}!
                </h2>
                <p className="text-gray-600">
                  Here's what's happening with your users today.
                </p>
              </div>

              <UserTable />
            </div>
          </main>
        </div>
      </div>
    </UserProvider>
  );
};

export default Dashboard;