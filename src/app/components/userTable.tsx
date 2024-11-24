"use client"
import React, { useEffect } from 'react';
import UserCard from './userCard';
import { useUsers } from '../../store/userContext';
import { useRoles } from '../../store/rolesContext';

const UserTable: React.FC = () => {
  const { users } = useUsers();
  const { roles } = useRoles();

  useEffect(() => {
    console.log('Dashboard Users Updated:', users);
  }, [users]); // Monitor users array for changes

  return (
    <div className="w-full p-4 bg-black-100 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>
        <span className="text-gray-500">{users.length} total users</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, index) => {
          const userRole = roles.find(role => role.id === user.roleId);
          const userWithRole = {
            ...user,
            role: userRole?.name || user.role // Use role name from roles context
          };
          
          return <UserCard key={user.email || index} user={userWithRole} />;
        })}
      </div>
    </div>
  );
};

export default UserTable;