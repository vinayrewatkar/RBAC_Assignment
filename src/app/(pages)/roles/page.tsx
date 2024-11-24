"use client"
import React from 'react';
import { RoleTable } from './_components/roleTable';
import { RolesProvider } from '../../../store/rolesContext';

const RolesPage: React.FC = () => {
  return (
    <RolesProvider>
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2">Role Management</h1>
            <p className="text-gray-600">
              Manage roles and their associated permissions.
            </p>
          </div>
          <RoleTable />
        </div>
      </div>
    </RolesProvider>
  );
};

export default RolesPage;