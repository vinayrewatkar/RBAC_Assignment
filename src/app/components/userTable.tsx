"use client"
import React, { useState, useEffect } from 'react';
import UserCard from './userCard';
import UserForm from './AddUserForm';
import { useUsers } from '../../store/userContext';

const UserTable: React.FC = () => {
  const { users } = useUsers();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Add detailed logging
  useEffect(() => {
    console.log('Users:', users);
    
    // Check each user's structure
    users.forEach((user, index) => {
      console.log(`User ${index}:`, JSON.stringify(user, null, 2));
      
      // Validate user object
      if (typeof user !== 'object' || user === null) {
        console.error(`Invalid user at index ${index}:`, user);
      }
      
      // Check for unexpected properties
      const unexpectedProps = Object.keys(user).filter(
        key => !['name', 'role', 'email', 'joinedDate', 'isActive', 'roleId'].includes(key)
      );
      
      if (unexpectedProps.length > 0) {
        console.error(`Unexpected properties in user at index ${index}:`, unexpectedProps);
      }
    });
  }, [users]);

  return (
    <div className="w-full p-4 bg-black-100 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Management</h2>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add User
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, index) => {
          // Add a safe check before rendering
          if (typeof user !== 'object' || user === null) {
            console.error(`Invalid user at index ${index}:`, user);
            return null; // Skip rendering this invalid user
          }
          return <UserCard key={user.email || index} user={user} />;
        })}
      </div>

      {isFormOpen && (
        <UserForm 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
};

export default UserTable;