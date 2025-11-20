import { UserTaskAttributes } from './userTask.js';
import { Omit } from 'utility-types';

/**
 * DTO to create userTask.
 */
export interface CreateUserTaskDTO {
  user_id: string;
  task_id: string;
  assignment_date: Date;
  is_main_responsible: boolean;
}

/**
 * DTO to update userTask.
 */
export interface UpdateUserTaskDTO {
  user_id?: string;
  task_id?: string;
  assignment_date?: Date;
  is_main_responsible?: boolean;
}

/**
 * DTO to securely represent a userTask in the API response.
 */
export type SafeUserTaskDTO = Omit<UserTaskAttributes, never>;

/**
 * DTO to represent the paged response of userTask.
 */
export interface PaginatedUserTaskDTO {
  totalItems: number;
  userTasks: SafeUserTaskDTO[];
  totalPages: number;
  currentPage: number;
}
