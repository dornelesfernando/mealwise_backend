import { AttachmentAttributes } from './attachment.js';
import { Omit } from 'utility-types';

/**
 * DTO to create attachment.
 */
export interface CreateAttachmentDTO {
  file: {
    buffer: Buffer;
    originalName: string;
    mimetype: string;
    size: number;
  };
  creator_id: string;
  task_id?: string;
  project_id?: string;
}

/**
 * DTO to update attachment.
 */
export interface UpdateAttachmentDTO {
  file_name?: string;
  storage_path?: string;
  mime_type?: string;
  size_bytes?: number;
  creator_id?: string;
  task_id?: string;
  project_id?: string;
}

/**
 * DTO to securely represent a attachment in the API response.
 */
export type SafeAttachmentDTO = Omit<AttachmentAttributes, never>;

/**
 * DTO to represent the paged response of attachment.
 */
export interface PaginatedAttachmentDTO {
  totalItems: number;
  attachments: SafeAttachmentDTO[];
  totalPages: number;
  currentPage: number;
}
