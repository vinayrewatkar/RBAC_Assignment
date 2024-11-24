"use client";
import React from 'react';
import Link from 'next/link';
import { Users, Shield } from 'lucide-react';
import UserGuide from './components/userGuide';

const HomePage = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* User Guide */}
        <div className="mb-8">
          <UserGuide />
        </div>

        {/* Centered Welcome Heading */}
        <h1 className="text-3xl font-bold mb-8 text-center">
          Welcome to Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Users Card */}
          <Link 
            href="/pages/users"
            className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <h2 className="text-xl font-semibold">User Management</h2>
                <p className="text-gray-600">Manage system users and their access</p>
              </div>
            </div>
          </Link>

          {/* Roles Card */}
          <Link 
            href="/pages/roles"
            className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <h2 className="text-xl font-semibold">Role Management</h2>
                <p className="text-gray-600">Configure roles and permissions</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
