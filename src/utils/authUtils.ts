// /utils/authUtils.ts

// Check if the user is authenticated (example using JWT token)
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("authToken");
    return token ? true : false;
  };
  
  // Get the current user from local storage (or another place)
  export const getCurrentUser = (): { id: string; name: string } | null => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  };
  