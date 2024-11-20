// components/UserCard.tsx
import React, { useState } from 'react';
import { User, Edit, Trash2 } from 'lucide-react';
import { UserCardProps } from '../../types/type';
import UserForm from './AddUserForm';
import { useUsers } from '../../store/userContext';

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteUser } = useUsers();

  const handleDeleteUser = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click events

    const confirmDelete = window.confirm(
      `Are you sure you want to delete user ${user.name}?`
    );

    if (confirmDelete) {
      deleteUser(user.email); // Call deleteUser from context
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click events
    setIsEditModalOpen(true); // Open the edit modal
  };

  return (
    <>
      <div className="bg-gray-900 text-white p-4 rounded-lg w-full relative overflow-hidden flex flex-col items-center justify-center min-h-[200px] hover:shadow-lg transition-shadow duration-300">
        {/* Icons Container */}
        <div className="absolute top-2 right-2 z-20 flex items-center space-x-2">
          {/* Edit Icon */}
          <button
            onClick={handleEditClick}
            className="text-gray-400 hover:text-blue-400 transition-colors z-30"
            title="Edit User"
          >
            <Edit className="w-5 h-5" />
          </button>


          {/* Delete Icon */}
          <button
            onClick={handleDeleteUser}
            className="text-gray-400 hover:text-red-400 transition-colors z-30"
            title="Delete User"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Status Indicator */}
        <div
          className={`flex items-center gap-2 text-xs ${
            user.isActive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              user.isActive ? 'bg-green-400' : 'bg-red-400'
            } animate-pulse`}
          />
          {user.isActive ? 'Active' : 'Inactive'}
        </div>

        {/* User Info */}
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full mb-3 mx-auto flex items-center justify-center">
            <User className="w-8 h-8 text-gray-300" />
          </div>
          <div className="text-2xl font-bold mb-1">{user.name}</div>
          <div className="text-sm text-gray-400">{user.role}</div>
          <div className="text-xs mt-2 text-gray-300">{user.email}</div>
          <div className="text-xs text-gray-500 mt-1">
            Joined: {user.joinedDate}
          </div>
        </div>

        {/* Status Bar */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-1 ${
            user.isActive ? 'bg-green-400' : 'bg-red-400'
          }`}
        />

        {/* Background Effect */}
        <div
          className={`absolute inset-0 ${
            user.isActive ? 'bg-green-400' : 'bg-red-400'
          } opacity-5`}
        >
          <div className="absolute inset-0 animate-pulse"></div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <UserForm
          initialUser={user}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserCard;
