export const userRoles = ['user', 'admin'] as const;

export type UserRole = (typeof userRoles)[number];

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  lastLoginAt: Date;
  createdAt: Date;
}
