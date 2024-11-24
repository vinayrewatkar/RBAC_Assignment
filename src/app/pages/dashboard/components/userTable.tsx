"use client";
import React, { useEffect, useState } from 'react';
import UserCard from './userCard';
import { useUsers } from '../../../../store/userContext';
import { useRoles } from '../../../../store/rolesContext';
import { Search } from 'lucide-react';

const UserTable: React.FC = () => {
  const { users } = useUsers();
  const { roles } = useRoles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    // Apply filters
    const filtered = users.filter(user => {
      // Search filter - check if search query matches name or email
      const matchesSearch = 
        searchQuery === '' || 
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase());

      // Role filter
      const matchesRole = 
        selectedRole === 'all' || 
        user.roleId?.toString() === selectedRole.toString();

      return matchesSearch && matchesRole;
    });

    console.log('Filtering details:', {
      totalUsers: users.length,
      searchQuery,
      selectedRole,
      filteredCount: filtered.length,
      sampleUser: users[0],
      sampleFiltered: filtered[0]
    });

    setFilteredUsers(filtered);
  }, [users, searchQuery, selectedRole]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
    console.log('Role changed to:', e.target.value);
  };

  return (
    <div className="w-full p-4 bg-black-100 rounded-lg">
      {/* Header and Filters */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-black text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name or email..."
              className="w-full p-2 pl-10 rounded-lg bg-black text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
          </div>
        </div>
        <span className="text-gray-500">
          {filteredUsers.length} of {users.length} users
        </span>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user, index) => {
          const userRole = roles.find(role => role.id?.toString() === user.roleId?.toString());
          const userWithRole = {
            ...user,
            role: userRole?.name || 'No Role'
          };

          return <UserCard key={user.email || index} user={userWithRole} />;
        })}
      </div>
    </div>
  );
};

export default UserTable;