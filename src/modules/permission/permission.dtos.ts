import { PermissionAttributes } from './permission.js';
import { Omit } from 'utility-types';

/**
 * DTO to create permission.
 */
export interface CreatePermissionDTO {
  name: string;
  description?: string;
}

/**
 * DTO to update permission.
 */
export interface UpdatePermissionDTO {
  name?: string;
  description?: string;
}

/**
 * DTO to securely represent a permission in the API response.
 */
export type SafePermissionDTO = Omit<PermissionAttributes, never>;

/**
 * DTO to represent the paged response of permission.
 */
export interface PaginatedPermissionDTO {
  totalItems: number;
  permissions: SafePermissionDTO[];
  totalPages: number;
  currentPage: number;
}
