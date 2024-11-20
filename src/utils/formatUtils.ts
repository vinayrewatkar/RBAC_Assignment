// /utils/formatUtils.ts

// Format date in a readable format
export const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Format user name
  export const formatUserName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`;
  };
  