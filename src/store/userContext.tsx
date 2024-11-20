"use client"
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserType } from '../types/type';

// Default initial users
const defaultUsers: UserType[] = [
  {
    name: "John Doe",
    role: "Software Engineer",
    email: "johndoe@example.com",
    joinedDate: "Jan 12, 2023",
    isActive: true,
  },
  {
    name: "Jane Smith",
    role: "Product Manager",
    email: "janesmith@example.com",
    joinedDate: "Feb 8, 2022",
    isActive: false,
  },
  {
    name: "Alice Johnson",
    role: "Data Analyst",
    email: "alicej@example.com",
    joinedDate: "Mar 15, 2023",
    isActive: true,
  }
];

// Define the shape of the context
interface UserContextType {
  users: UserType[];
  addUser: (user: UserType) => void;
  updateUser: (updatedUser: UserType) => void;
  deleteUser: (email: string) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType>({
  users: defaultUsers,
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
});

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserType[]>(defaultUsers);
  const [isClient, setIsClient] = useState(false);

  // Helper function to validate user
  const isValidUser = (user: any): user is UserType => {
    return (
      typeof user === 'object' && 
      user !== null && 
      typeof user.name === 'string' &&
      typeof user.role === 'string' &&
      typeof user.email === 'string' &&
      typeof user.joinedDate === 'string' &&
      typeof user.isActive === 'boolean'
    );
  };

  // Effect to handle localStorage after client-side mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('users');

      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers);
          
          const validUsers = Array.isArray(parsedUsers) 
            ? parsedUsers.filter(isValidUser)
            : [];

          setUsers(validUsers.length > 0 ? validUsers : defaultUsers);
        } catch (error) {
          console.error('Error parsing stored users:', error);
          setUsers(defaultUsers);
        }
      }

      setIsClient(true);
    }
  }, []);

  // Effect to update localStorage when users change
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('users', JSON.stringify(users));
      } catch (error) {
        console.error('Error storing users in localStorage:', error);
      }
    }
  }, [users, isClient]);

  // Add new user
  const addUser = (newUser: UserType) => {
    // Validate the new user
    if (!isValidUser(newUser)) {
      console.error('Invalid user data:', newUser);
      return;
    }

    // Normalize email
    const normalizedEmail = newUser.email.trim().toLowerCase();
    
    // Check if user with same email already exists
    const existingUserIndex = users.findIndex(u => 
      u.email.trim().toLowerCase() === normalizedEmail
    );

    let updatedUsers;
    if (existingUserIndex !== -1) {
      // If user exists, update the existing user
      updatedUsers = users.map((u, index) => 
        index === existingUserIndex 
          ? { ...u, ...newUser, email: normalizedEmail } 
          : u
      );
    } else {
      // Add new user only if email is unique
      updatedUsers = [...users, {
        ...newUser,
        email: normalizedEmail,
        joinedDate: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      }];
    }

    setUsers(updatedUsers);
  };

  // Update existing user
  const updateUser = (updatedUser: UserType) => {
    // Validate the updated user
    if (!isValidUser(updatedUser)) {
      console.error('Invalid user data:', updatedUser);
      return;
    }

    // Normalize email
    const normalizedEmail = updatedUser.email.trim().toLowerCase();

    const updatedUsers = users.map(user => 
      user.email.trim().toLowerCase() === normalizedEmail 
        ? { ...updatedUser, email: normalizedEmail } 
        : user
    );
    setUsers(updatedUsers);
  };

  // Delete user
  const deleteUser = (email: string) => {
    // Normalize email for comparison
    const normalizedEmail = email.trim().toLowerCase();
    const updatedUsers = users.filter(user => 
      user.email.trim().toLowerCase() !== normalizedEmail
    );
    setUsers(updatedUsers);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};