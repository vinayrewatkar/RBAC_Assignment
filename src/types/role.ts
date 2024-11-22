import { PermissionType } from "./type";

export interface Permission {
  id: string;
  name: PermissionType;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}