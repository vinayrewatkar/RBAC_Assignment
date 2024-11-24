// store/userContext.tsx
"use client"
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserType } from '../types/type';
import { Role } from '../types/role';

const defaultUsers: UserType[] = [
  {
    name: "Example1",
    role: "Software Engineer",
    email: "example1@example.com",
    joinedDate: "Jan 12, 2023",
    isActive: true,
    roleId: "1" 
  },
  {
    name: "Example2",
    role: "Product Manager",
    email: "example2@example.com",
    joinedDate: "Feb 8, 2022",
    isActive: false,
    roleId: "2"
  }
];

interface UserContextType {
  users: UserType[];
  addUser: (user: UserType) => void;
  updateUser: (updatedUser: UserType) => void;
  deleteUser: (email: string) => void;
  getUsersByRole: (roleId: string) => UserType[];
  updateUserRole: (email: string, roleId: string) => void;
  getUserPermissions: (email: string, roles: Role[]) => string[];
  refreshUsers: () => void;
}

const UserContext = createContext<UserContextType>({
  users: defaultUsers,
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  getUsersByRole: () => [],
  updateUserRole: () => {},
  getUserPermissions: () => [],
  refreshUsers: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserType[]>(defaultUsers);
  const [isClient, setIsClient] = useState(false);

  const loadUsersFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers);
          return Array.isArray(parsedUsers) ? parsedUsers : defaultUsers;
        } catch (error) {
          console.error('Error parsing stored users:', error);
          return defaultUsers;
        }
      }
    }
    return defaultUsers;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsers(loadUsersFromStorage());
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users, isClient]);

  const refreshUsers = () => {
    setUsers(loadUsersFromStorage());
  };

  const addUser = (newUser: UserType) => {
    const normalizedEmail = newUser.email.trim().toLowerCase();
    const updatedUsers = [...users, {
      ...newUser,
      email: normalizedEmail,
      joinedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      roleId: newUser.roleId || "2"
    }];
    
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const updateUser = (updatedUser: UserType) => {
    const normalizedEmail = updatedUser.email.trim().toLowerCase();
    const updatedUsers = users.map(user =>
      user.email.trim().toLowerCase() === normalizedEmail
        ? { ...updatedUser, email: normalizedEmail }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const updatedUsers = users.filter(user =>
      user.email.trim().toLowerCase() !== normalizedEmail
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const getUsersByRole = (roleId: string): UserType[] => {
    return users.filter(user => user.roleId === roleId);
  };

  const updateUserRole = (email: string, roleId: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const updatedUsers = users.map(user =>
      user.email.trim().toLowerCase() === normalizedEmail
        ? { ...user, roleId }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const getUserPermissions = (email: string, roles: Role[]): string[] => {
    const user = users.find(u => u.email.trim().toLowerCase() === email.trim().toLowerCase());
    if (!user || !user.roleId) return [];
    const userRole = roles.find(role => role.id === user.roleId);
    return userRole ? userRole.permissions.map(permission => permission.name) : [];
  };

  return (
    <UserContext.Provider value={{
      users,
      addUser,
      updateUser,
      deleteUser,
      getUsersByRole,
      updateUserRole,
      getUserPermissions,
      refreshUsers
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};