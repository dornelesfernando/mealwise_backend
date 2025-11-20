import { TaskAttributes } from './task.js';
import {
  EnumPriority,
  EnumStatus,
  EnumCreationStatus,
} from '../../enums/Enums.js';
import { Omit } from 'utility-types';

/**
 * DTO to create task.
 */
export interface CreateTaskDTO {
  parent_id?: string;
  name: string;
  description?: string;
  due_date?: Date;
  priority: EnumPriority;
  status: EnumCreationStatus;
  project_id: string;
  creator_id: string;
  assigned_users?: string[];
}

/**
 * DTO to update task.
 */
export interface UpdateTaskDTO {
  name?: string;
  parent_id?: string;
  description?: string;
  due_date?: Date;
  priority?: EnumPriority;
  status?: EnumStatus;
  project_id?: string;
  // creator_id?: string; // cannot change task creator.
  assigned_users?: string[];
}

/**
 * DTO to securaly represent a task in the API response.
 */
export type SafeTaskDTO = Omit<TaskAttributes, never>;

/**
 * DTO to represent the paged response of task.
 */
export interface PaginatedTaskDTO {
  totalItems: number;
  tasks: SafeTaskDTO[];
  totalPages: number;
  currentPage: number;
}
