"use client"
import React, { useState } from 'react';
import { UserType } from '../../types/type';
import { useUsers } from '../../store/userContext';

interface UserFormProps {
  initialUser?: UserType;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialUser, onClose }) => {
  const { addUser, updateUser } = useUsers();
  const [formData, setFormData] = useState<UserType>({
    name: initialUser?.name || '',
    role: initialUser?.role || '',
    email: initialUser?.email || '',
    joinedDate: initialUser?.joinedDate || new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    isActive: initialUser?.isActive ?? true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'isActive' ? value === 'true' : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.role) {
      alert('Please fill in all required fields');
      return;
    }

    // Ensure unique email and consistent formatting
    const userWithEmail = {
      ...formData,
      email: formData.email.trim().toLowerCase(),
      joinedDate: formData.joinedDate || new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    };

    if (initialUser) {
      // Updating existing user
      updateUser(userWithEmail);
    } else {
      // Adding new user
      addUser(userWithEmail);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">
          {initialUser ? 'Edit User' : 'Add New User'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Status</label>
            <select
              name="isActive"
              value={formData.isActive.toString()}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white p-2 rounded"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {initialUser ? 'Update User' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;