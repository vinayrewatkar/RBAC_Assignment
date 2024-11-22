// store/userContext.tsx
"use client"
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserType } from '../types/type';
import { Role } from '../types/role';

// Enhanced default users with roleId
const defaultUsers: UserType[] = [
  {
    name: "John Doe",
    role: "Software Engineer",
    email: "johndoe@example.com",
    joinedDate: "Jan 12, 2023",
    isActive: true,
    roleId: "1" // Admin role
  },
  {
    name: "Jane Smith",
    role: "Product Manager",
    email: "janesmith@example.com",
    joinedDate: "Feb 8, 2022",
    isActive: false,
    roleId: "2" // User role
  },
  {
    name: "Alice Johnson",
    role: "Data Analyst",
    email: "alicej@example.com",
    joinedDate: "Mar 15, 2023",
    isActive: true,
    roleId: "2" // User role
  }
];

// Enhanced context type with role-related functions
interface UserContextType {
  users: UserType[];
  addUser: (user: UserType) => void;
  updateUser: (updatedUser: UserType) => void;
  deleteUser: (email: string) => void;
  getUsersByRole: (roleId: string) => UserType[];
  updateUserRole: (email: string, roleId: string) => void;
  getUserPermissions: (email: string, roles: Role[]) => string[];
}

// Create context with default value
const UserContext = createContext<UserContextType>({
  users: defaultUsers,
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  getUsersByRole: () => [],
  updateUserRole: () => {},
  getUserPermissions: () => [],
});

// Enhanced Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserType[]>(defaultUsers);
  const [isClient, setIsClient] = useState(false);

  // Enhanced user validation
  const isValidUser = (user: any): user is UserType => {
    return (
      typeof user === 'object' && 
      user !== null && 
      typeof user.name === 'string' &&
      typeof user.role === 'string' &&
      typeof user.email === 'string' &&
      typeof user.joinedDate === 'string' &&
      typeof user.isActive === 'boolean' &&
      (user.roleId === undefined || typeof user.roleId === 'string')
    );
  };

  // Effect to handle localStorage
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

  // Effect to update localStorage
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('users', JSON.stringify(users));
      } catch (error) {
        console.error('Error storing users in localStorage:', error);
      }
    }
  }, [users, isClient]);

  // Add new user with role
  const addUser = (newUser: UserType) => {
    if (!isValidUser(newUser)) {
      console.error('Invalid user data:', newUser);
      return;
    }

    const normalizedEmail = newUser.email.trim().toLowerCase();
    
    const existingUserIndex = users.findIndex(u => 
      u.email.trim().toLowerCase() === normalizedEmail
    );

    let updatedUsers;
    if (existingUserIndex !== -1) {
      updatedUsers = users.map((u, index) => 
        index === existingUserIndex 
          ? { ...u, ...newUser, email: normalizedEmail } 
          : u
      );
    } else {
      updatedUsers = [...users, {
        ...newUser,
        email: normalizedEmail,
        joinedDate: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        roleId: newUser.roleId || "2" // Default to basic user role if not specified
      }];
    }

    setUsers(updatedUsers);
  };

  // Update existing user
  const updateUser = (updatedUser: UserType) => {
    if (!isValidUser(updatedUser)) {
      console.error('Invalid user data:', updatedUser);
      return;
    }

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
    const normalizedEmail = email.trim().toLowerCase();
    const updatedUsers = users.filter(user => 
      user.email.trim().toLowerCase() !== normalizedEmail
    );
    setUsers(updatedUsers);
  };

  // Get users by role
  const getUsersByRole = (roleId: string): UserType[] => {
    return users.filter(user => user.roleId === roleId);
  };

  // Update user role
  const updateUserRole = (email: string, roleId: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const updatedUsers = users.map(user => 
      user.email.trim().toLowerCase() === normalizedEmail 
        ? { ...user, roleId } 
        : user
    );
    setUsers(updatedUsers);
  };

  // Get user permissions based on their role
  const getUserPermissions = (email: string, roles: Role[]): string[] => {
    const user = users.find(u => u.email.trim().toLowerCase() === email.trim().toLowerCase());
    if (!user || !user.roleId) return [];

    const userRole = roles.find(role => role.id === user.roleId);
    if (!userRole) return [];

    return userRole.permissions.map(permission => permission.name);
  };

  return (
    <UserContext.Provider value={{ 
      users, 
      addUser, 
      updateUser, 
      deleteUser,
      getUsersByRole,
      updateUserRole,
      getUserPermissions
    }}>
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