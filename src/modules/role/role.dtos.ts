import { RoleAttributes } from './role.js';
import { Omit } from 'utility-types';

/**
 * DTO to create role.
 */
export interface CreateRoleDTO {
  name: string;
  description?: string;
}

/**
 * DTO to update role.
 */
export interface UpdateRoleDTO {
  name?: string;
  description?: string;
}

/**
 * DTO to securely represent a role in the API response.
 */
export type SafeRoleDTO = Omit<RoleAttributes, never>;

/**
 * DTO to represent the paged response of role.
 */
export interface PaginatedRoleDTO {
  totalItems: number;
  roles: SafeRoleDTO[];
  totalPages: number;
  currentPage: number;
}
