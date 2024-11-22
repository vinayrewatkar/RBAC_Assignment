"use client"
import React, { useState, useEffect } from 'react';
import UserTable from '../../components/userTable';
import { UserType } from '../../../types/type';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  return (
    <div className="p-4">
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
    </div>
  );
};

export default Dashboard;