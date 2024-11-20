"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { Role } from "../types/role";

interface RoleContextType {
  roles: Role[];
  addRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [roles, setRoles] = useState<Role[]>([]);

  const addRole = (role: Role) => {
    setRoles([...roles, role]);
  };

  return (
    <RoleContext.Provider value={{ roles, addRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRoleContext = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoleContext must be used within a RoleProvider");
  }
  return context;
};
