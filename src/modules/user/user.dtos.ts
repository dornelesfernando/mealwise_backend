import { UserAttributes } from './user.js';

/**
 * DTO to create project.
 */
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  hiring_date: Date;
  position_id: string;
  cellphone?: string;
  birth_date?: Date;
  address?: string;
  department_id?: string;
  supervisor_id?: string;
  is_active: boolean;
}

/**
 * DTO to update project.
 */
export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  cellphone?: string;
  birth_date?: Date;
  address?: string;
  department_id?: string;
  position_id?: string;
  supervisor_id?: string;
  is_active?: boolean;
}

/**
 * DTO to securely represent a project in the API response.
 * Excludes password hash and virtual password.
 */
export type SafeUserDTO = Omit<UserAttributes, 'password_hash' | 'password'>;

/**
 * DTO to repesent the paged response of projects.
 */
export interface PaginatedUsersDTO {
  totalItems: number;
  users: SafeUserDTO[];
  totalPages: number;
  currentPage: number;
}
