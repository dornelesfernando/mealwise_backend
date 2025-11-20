import { UserRoleAttributes } from './userRole.js';
import { Omit } from 'utility-types';

/**
 * DTO to create userRole.
 */
export interface CreateUserRoleDTO {
  user_id: string;
  role_id: string;
}

/**
 * DTO to update userRole.
 */
export interface UpdateUserRoleDTO {
  user_id?: string;
  role_id?: string;
}

/**
 * DTO to securely represent a userRole in the API response.
 */
export type SafeUserRoleDTO = Omit<UserRoleAttributes, never>;

/**
 * DTO to represent the paged response of userRole.
 */
export interface PaginatedUserRoleDTO {
  totalItems: number;
  userRoles: SafeUserRoleDTO[];
  totalPages: number;
  currentPage: number;
}
