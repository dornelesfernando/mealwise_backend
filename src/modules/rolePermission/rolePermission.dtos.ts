import { RolePermissionAttributes } from './rolePermission.js';
import { Omit } from 'utility-types';

/**
 * DTO to create rolePermission.
 */
export interface CreateRolePermissionDTO {
  role_id: string;
  permission_id: string;
}

/**
 * DTO to update rolePermission.
 */
export interface UpdateRolePermissionDTO {
  role_id?: string;
  permission_id?: string;
}

/**
 * DTO to securely represent a rolePermission in the API response.
 */
export type SafeRolePermissionDTO = Omit<RolePermissionAttributes, never>;

/**
 * DTO to represent the paged response of rolePermission.
 */
export interface PaginatedRolePermissionDTO {
  totalItems: number;
  rolePermissions: SafeRolePermissionDTO[];
  totalPages: number;
  currentPage: number;
}
