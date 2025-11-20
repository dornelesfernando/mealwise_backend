import { HourLogAttributes } from './hourLog.js';
import { EnumApprovalStatus } from '../../enums/Enums.js';
import { Omit } from 'utility-types';

/**
 * DTO to create hourLog.
 */
export interface CreateHourLogDTO {
  task_id: string;
  user_id: string;
  log_date: Date;
  start_time: string;
  end_time?: string;
  hours_worked?: number;
  // approval_status: EnumApprovalStatus;
  description?: string;
  // approver_id?: string;
  // approval_date?: Date;
}

/**
 * DTO to update hourLog.
 */
export interface UpdateHourLogDTO {
  task_id?: string;
  user_id?: string;
  log_date?: Date;
  start_time?: string;
  end_time?: string;
  hours_worked?: number;
  approval_status?: EnumApprovalStatus;
  description?: string;
  approver_id?: string;
  approval_date?: Date;
}

/**
 * DTO to securely represent a hourLog in the API response.
 */
export type SafeHourLogDTO = Omit<HourLogAttributes, never>;

/**
 * DTO to represent the paged response of hourLog.
 */
export interface PaginatedHourLogDTO {
  totalItems: number;
  hourLogs: SafeHourLogDTO[];
  totalPages: number;
  currentPage: number;
}
