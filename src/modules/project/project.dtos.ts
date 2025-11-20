import { ProjectAttributes } from './project.js';
import {
  EnumStatus,
  EnumCreationStatus,
  EnumPriority,
} from '../../enums/Enums.js';
import { Omit } from 'utility-types';

/**
 * DTO to create project.
 */
export interface CreateProjectDTO {
  parent_id?: string;
  name: string;
  description?: string;
  start_date: Date;
  expected_end_date?: Date;
  priority: EnumPriority;
  status: EnumCreationStatus;
  manager_id: string;
}

/**
 * DTO to update project.
 */
export interface UpdateProjectDTO {
  parent_id?: string;
  name?: string;
  description?: string;
  start_date?: Date;
  expected_end_date?: Date;
  priority?: EnumPriority;
  status?: EnumStatus;
  manager_id?: string;
}

/**
 * DTO to securely represent a project in the API response.
 */
export type SafeProjectDTO = Omit<ProjectAttributes, never>;

/**
 * DTO to represent the paged response of projects.
 */
export interface PaginatedProjectDTO {
  totalItems: number;
  projects: SafeProjectDTO[];
  totalPages: number;
  currentPage: number;
}
