import {
  CreateAttachmentDTO,
  PaginatedAttachmentDTO,
  SafeAttachmentDTO,
  UpdateAttachmentDTO,
} from './attachment.dtos.js';
import { AppError } from '../../utils/AppError.js';
import { Attachment } from './attachment.js';
import { FileStorageService } from '../../hooks/FileStorageService.js';
import { sequelize } from '../../models/index.js';

export class AttachmentService {
  private fileStorageService = new FileStorageService();

  constructor() {
    this.fileStorageService = new FileStorageService();
  }

  /**
   * Creates a new attachment.
   * @param attachmentData - DTO with the attachment data.
   * @returns The updated attachment object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async create(
    attachmentData: CreateAttachmentDTO,
  ): Promise<SafeAttachmentDTO> {
    const t = await sequelize.transaction();
    let storagePath: string | null = null;

    try {
      storagePath = await this.fileStorageService.uploadFile(
        attachmentData.file.buffer,
        attachmentData.file.originalName,
      );

      const newAttachment = await Attachment.create(
        {
          file_name: attachmentData.file.originalName,
          storage_path: storagePath,
          mime_type: attachmentData.file.mimetype,
          size_bytes: attachmentData.file.size,
          creator_id: attachmentData.creator_id,
          task_id: attachmentData.task_id,
          project_id: attachmentData.project_id,
        },
        { transaction: t },
      );

      await t.commit();

      return newAttachment as SafeAttachmentDTO;
    } catch (error) {
      await t.rollback();

      if (storagePath) {
        await this.fileStorageService
          .deleteFile(storagePath)
          .catch((err) =>
            console.error(
              'Falha ao limpar o arquivo de upload após erro no DB:',
              err,
            ),
          );
      }

      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar anexo: ', error);
      throw new AppError(
        'Não foi possível criar o anexo devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search for a attachment by its id, includes important associations.
   * @param id - attachment id.
   * @returns The updated attachment object.
   * @throws AppError if the attachment does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findById(id: string): Promise<SafeAttachmentDTO> {
    try {
      const attachment = await Attachment.findByPk(id, {
        include: [
          { association: 'task', attributes: ['id', 'name', 'status'] },
          { association: 'project', attributes: ['id', 'name', 'status'] },
          { association: 'creator', attributes: ['id', 'name', 'email'] },
        ],
      });

      if (!attachment) {
        throw new AppError('Anexo não encontrado.', 404);
      }

      return attachment as SafeAttachmentDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar anexo: ', error);
      throw new AppError(
        'Não foi possível buscar o anexo deviado a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search all attachments, includes important associations.
   * @param page - the page number to return.
   * @param limit - the limit number per page.
   * @returns An object with the pagination data and the attachment list.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedAttachmentDTO> {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await Attachment.findAndCountAll({
        limit,
        offset,
        include: [
          { association: 'task', attributes: ['id', 'name', 'status'] },
          { association: 'project', attributes: ['id', 'name', 'status'] },
          { association: 'creator', attributes: ['id', 'name', 'email'] },
        ],
      });

      return {
        totalItems: count,
        attachments: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar anexos: ', error);
      throw new AppError(
        'Não foi possível buscar os anexos devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Updates an existing attachment.
   * @param id - attachment id.
   * @param attachmentData - DTO with the updated attachment data.
   * @returns The updated attachment object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async update(
    id: string,
    attachmentData: UpdateAttachmentDTO,
  ): Promise<SafeAttachmentDTO> {
    const t = await sequelize.transaction();

    try {
      const attachmentToUpdate = await Attachment.findByPk(id, {
        transaction: t,
      });

      if (!attachmentToUpdate) {
        await t.rollback();
        throw new AppError('Anexo não encontrado.', 404);
      }

      await attachmentToUpdate.update(attachmentData, { transaction: t });
      await t.commit();

      const updatedAttachment = await Attachment.findByPk(id, {
        include: [
          { association: 'task', attributes: ['id', 'name', 'status'] },
          { association: 'project', attributes: ['id', 'name', 'status'] },
          { association: 'creator', attributes: ['id', 'name', 'email'] },
        ],
      });
      if (!updatedAttachment) {
        throw new AppError('Falha ao buscar anexo atualizado.', 404);
      }

      return updatedAttachment as SafeAttachmentDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao atualizar anexo: ', error);
      throw new AppError(
        'Não foi possível atualizar o anexo devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Delete attachment.
   * @param id - attachment id.
   * @returns The deleted attachment object.
   * @throws AppError if the attachment does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async delete(id: string): Promise<void> {
    const t = await sequelize.transaction();

    try {
      const attachmentToDelete = await Attachment.findByPk(id, {
        transaction: t,
      });

      if (!attachmentToDelete) {
        await t.rollback;
        throw new AppError('Anexo não encontrado.', 404);
      }

      await this.fileStorageService.deleteFile(attachmentToDelete.storage_path);
      await attachmentToDelete.destroy({ transaction: t });
      await t.commit();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao deletar anexo: ', error);
      throw new AppError(
        'Não foi possível deletar o anexo devido a um erro interno.',
        500,
      );
    }
  }
}
