import { Request, Response, NextFunction } from 'express';
import { AttachmentService } from './attachment.service.js';
import {
  CreateAttachmentDTO,
  UpdateAttachmentDTO,
  SafeAttachmentDTO,
  PaginatedAttachmentDTO,
} from './attachment.dtos.js';
import { AppError } from '../../utils/AppError.js';
import { fileSchema } from './attachment.validation.js';

const attachmentService = new AttachmentService();

export class AttachmentController {
  /**
   * Creates a new attachment
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.file) {
        throw new AppError('Nenhum arquivo enviado.', 400);
      }

      const validatedFile = fileSchema.parse({
        buffer: req.file.buffer,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });

      const attachmentData: CreateAttachmentDTO = {
        file: {
          buffer: validatedFile.buffer,
          originalName: validatedFile.originalname,
          mimetype: validatedFile.mimetype,
          size: validatedFile.size,
        },
        creator_id: req.body.creator_id,
        task_id: req.body.task_id,
        project_id: req.body.project_id,
      };

      const newAttachment: SafeAttachmentDTO =
        await attachmentService.create(attachmentData);
      res.status(201).json({ success: true, data: newAttachment });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search the attachment by id
   */
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const attachment: SafeAttachmentDTO =
        await attachmentService.findById(id);
      res.status(200).json({ success: true, data: attachment });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search all attachments
   */
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const attachments: PaginatedAttachmentDTO =
        await attachmentService.findAll(page, limit);
      res.status(200).json({ success: true, data: attachments });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * update the attachment by id
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const attachmentData: UpdateAttachmentDTO = req.body;

      const updatedAttachment: SafeAttachmentDTO =
        await attachmentService.update(id, attachmentData);
      res.status(200).json({ success: true, data: updatedAttachment });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * delete the attachment by id
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await attachmentService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
