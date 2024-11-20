export type PermissionType = 'read' | 'write' | 'delete' | 'create' | 'update';

export interface UserType {
  name: string;
  role: string;
  email: string;
  joinedDate: string;
  isActive: boolean;
  roleId?: string;
}

export interface UserCardProps {
  user: UserType;
}