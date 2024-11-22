"use client"
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Role, Permission } from '../types/role';

const defaultPermissions: Permission[] = [
  { id: '1', name: 'read', description: 'Can view resources' },
  { id: '2', name: 'write', description: 'Can create and edit resources' },
  { id: '3', name: 'delete', description: 'Can delete resources' },
  { id: '4', name: 'create', description: 'Can create new resources' },
  { id: '5', name: 'update', description: 'Can update existing resources' },
];

const defaultRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: defaultPermissions,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'User',
    description: 'Basic access',
    permissions: [defaultPermissions[0]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface RolesContextType {
  roles: Role[];
  permissions: Permission[];
  addRole: (role: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRole: (role: Role) => void;
  deleteRole: (id: string) => void;
}

const RolesContext = createContext<RolesContextType>({
  roles: defaultRoles,
  permissions: defaultPermissions,
  addRole: () => {},
  updateRole: () => {},
  deleteRole: () => {},
});

export const RolesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRoles = localStorage.getItem('roles');
      if (storedRoles) {
        try {
          setRoles(JSON.parse(storedRoles));
        } catch (error) {
          console.error('Error parsing stored roles:', error);
          setRoles(defaultRoles);
        }
      }
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }, [roles, isClient]);

  const addRole = (newRole: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => {
    const role: Role = {
      ...newRole,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRoles([...roles, role]);
  };

  const updateRole = (updatedRole: Role) => {
    setRoles(roles.map(role => 
      role.id === updatedRole.id 
        ? { ...updatedRole, updatedAt: new Date().toISOString() } 
        : role
    ));
  };

  const deleteRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  return (
    <RolesContext.Provider value={{ 
      roles, 
      permissions: defaultPermissions, 
      addRole, 
      updateRole, 
      deleteRole 
    }}>
      {children}
    </RolesContext.Provider>
  );
};

export const useRoles = () => {
  const context = useContext(RolesContext);
  if (!context) {
    throw new Error('useRoles must be used within a RolesProvider');
  }
  return context;
};