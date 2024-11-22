"use client"
import React from 'react';
import { UserProvider } from '../../../store/userContext';
import { RolesProvider } from '../../../store/rolesContext';
import UserTable from './components/UserTable';

const UsersPage: React.FC = () => {
  return (
    <RolesProvider>
      <UserProvider>
      <div className="p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-2">User Management</h1>
              <p className="text-gray-600">
                Manage users, their roles, and account status.
              </p>
            </div>
            <UserTable />
          </div>
        </div>
      </UserProvider>
    </RolesProvider>
  );
};

export default UsersPage;