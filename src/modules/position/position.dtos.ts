import { PositionAttributes } from './position.js';
import { Omit } from 'utility-types';

/**
 * DTO to create position.
 */
export interface CreatePositionDTO {
  name: string;
  description?: string;
  hierarchical_level: number;
}

/**
 * DTO to update position.
 */
export interface UpdatePositionDTO {
  name?: string;
  description?: string;
  hierarchical_level?: number;
}

/**
 * DTO to securely represent a position in the API response.
 */
export type SafePositionDTO = Omit<PositionAttributes, never>;

/**
 * DTO to represent the paged response of position.
 */
export interface PaginatedPositionDTO {
  totalItems: number;
  positions: SafePositionDTO[];
  totalPages: number;
  currentPage: number;
}
