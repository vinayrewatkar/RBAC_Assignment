// /utils/rbacUtils.ts

// Check if the user has a specific role
export const hasRole = (userRoles: string[], role: string): boolean => {
    return userRoles.includes(role);
  };
  
  // Check if the user has a specific permission
  export const hasPermission = (userPermissions: string[], permission: string): boolean => {
    return userPermissions.includes(permission);
  };
  
  // Combine role and permission check
  export const canAccess = (userRoles: string[], userPermissions: string[], requiredRole: string, requiredPermission: string): boolean => {
    return hasRole(userRoles, requiredRole) && hasPermission(userPermissions, requiredPermission);
  };
  