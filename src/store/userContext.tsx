"use client"
import React, { createContext, useContext, ReactNode, useState } from "react";
import { User } from "../types/user"; // Import the User type

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: number, updatedUser: Partial<User>) => void;
  removeUser: (id: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => setUsers([...users, user]);

  const updateUser = (id: number, updatedUser: Partial<User>) => {
    setUsers(users.map(user => (user.id === id ? { ...user, ...updatedUser } : user)));
  };

  const removeUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
