import z from 'zod';
import { registerSchema } from '../auth/auth.validation.js';
import { UserAttributes } from './user.js';

/**
 * DTO to create user.
 */
export type CreateUserDTO = z.infer<typeof registerSchema>;

/**
 * DTO to update user.
 */
export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  // cellphone?: string;
  // birth_date?: Date;
  // address?: string;
  // department_id?: string;
  // position_id?: string;
  // supervisor_id?: string;
  is_active?: boolean;
}

/**
 * DTO to securely represent a user in the API response.
 * Excludes password hash and virtual password.
 */
export type SafeUserDTO = Omit<UserAttributes, 'password_hash' | 'password'>;

/**
 * DTO to repesent the paged response of users.
 */
export interface PaginatedUsersDTO {
  totalItems: number;
  users: SafeUserDTO[];
  totalPages: number;
  currentPage: number;
}
