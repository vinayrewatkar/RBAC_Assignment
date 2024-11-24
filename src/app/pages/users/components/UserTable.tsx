"use client";
import React, { useState, useEffect } from 'react';
import { useUsers } from '../../../../store/userContext';
import { useRoles } from '../../../../store/rolesContext';
import UserFormModal from './userFormModels';
import { UserType } from '../../../../types/type';
import { Edit, Trash2, Plus, ToggleLeft, ToggleRight, Search } from 'lucide-react';

const UserTable: React.FC = () => {
  const { users, updateUser, deleteUser } = useUsers();
  const { roles } = useRoles();
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [filteredUsers, setFilteredUsers] = useState(users); // State for filtered users

  useEffect(() => {
    // Filter users based on the search query
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [users, searchQuery]);

  const handleDelete = (user: UserType) => {
    if (window.confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      deleteUser(user.email);
    }
  };

  const toggleUserStatus = (user: UserType) => {
    updateUser({
      ...user,
      isActive: !user.isActive,
    });
  };

  return (
    <div className="bg-black rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-xl font-semibold text-white mb-4 md:mb-0">Users</h2>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="w-full p-2 pl-10 rounded-lg bg-black text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
        </div>

        {/* Add User Button */}
        <button
          onClick={() => {
            setSelectedUser(null);
            setShowModal(true);
          }}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Joined Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-950 divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.email}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleUserStatus(user)}
                    className="flex items-center"
                  >
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.isActive ? (
                        <ToggleRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 mr-1" />
                      )}
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.joinedDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                    className="text-blue-400 hover:text-blue-900 mr-3"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="text-red-300 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      {showModal && (
        <UserFormModal
          initialUser={selectedUser}
          roles={roles}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default UserTable;
