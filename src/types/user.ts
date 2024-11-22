export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

export interface NewUserPayload {
  name: string;
  email: string;
  role: string;
}
