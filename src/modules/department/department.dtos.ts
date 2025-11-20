import { DepartmentAttributes } from './department.js';
import { Omit } from 'utility-types';

/**
 * DTO to create department.
 */
export interface CreateDepartmentDTO {
  name: string;
  description?: string;
  manager_id: string;
  is_active: boolean;
}

/**
 * DTO to update department.
 */
export interface UpdateDepartmentDTO {
  name?: string;
  description?: string;
  manager_id?: string;
  is_active?: boolean;
}

/**
 * DTO to securely represent a department in the API response.
 */
export type SafeDepartmentDTO = Omit<DepartmentAttributes, never>;

/**
 * DTO to represent the paged response of department.
 */
export interface PaginatedDepartmentDTO {
  totalItems: number;
  departments: SafeDepartmentDTO[];
  totalPages: number;
  currentPage: number;
}
