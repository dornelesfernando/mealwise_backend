import {
  CreatePermissionDTO,
  PaginatedPermissionDTO,
  SafePermissionDTO,
  UpdatePermissionDTO,
} from './permission.dtos.js';
import { AppError } from '../../utils/AppError.js';
import { Permission } from './permission.js';
import { sequelize } from '../../models/index.js';

export class PermissionService {
  /**
   * Creates a new permission.
   * @param permissionData - DTO with the permission data.
   * @returns The updated permission object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async create(
    permissionData: CreatePermissionDTO,
  ): Promise<SafePermissionDTO> {
    try {
      const newPermission = await sequelize.transaction(async (t) => {
        const permission = await Permission.create(permissionData, {
          transaction: t,
        });

        return permission;
      });

      return newPermission as SafePermissionDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar a permissão: ', error);
      throw new AppError(
        'Não foi possível criar a permissão devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search for a permission by its id, includes important associations.
   * @param id - permission id.
   * @returns The updated permission object.
   * @throws AppError if the permission does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findById(id: string): Promise<SafePermissionDTO> {
    try {
      const permission = await Permission.findByPk(id);

      if (!permission) {
        throw new AppError('Permissão não encontrada.', 404);
      }

      return permission as SafePermissionDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar permissão: ', error);
      throw new AppError(
        'Não foi possível buscar a permissão deviado a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search all permissions, includes important associations.
   * @param page - the page number to return.
   * @param limit - the limit number per page.
   * @returns An object with the pagination data and the permission list.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedPermissionDTO> {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await Permission.findAndCountAll({
        limit,
        offset,
      });

      return {
        totalItems: count,
        permissions: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar permissões: ', error);
      throw new AppError(
        'Não foi possível buscar as permissões devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Updates an existing permission.
   * @param id - permission id.
   * @param permissionData - DTO with the updated permission data.
   * @returns The updated permission object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async update(
    id: string,
    permissionData: UpdatePermissionDTO,
  ): Promise<SafePermissionDTO> {
    try {
      const permissionToUpdate = await Permission.findByPk(id);

      if (!permissionToUpdate) {
        throw new AppError('Permissão não encontrada.', 404);
      }

      await permissionToUpdate.update(permissionData);

      const updatedPermission = await Permission.findByPk(id);

      if (!updatedPermission) {
        throw new AppError('Falha ao buscar permissão atualizada.', 404);
      }

      return updatedPermission as SafePermissionDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao atualizar permissão: ', error);
      throw new AppError(
        'Não foi possível atualizar a permissão devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Delete permission.
   * @param id - permission id.
   * @returns The deleted permission object.
   * @throws AppError if the permission does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async delete(id: string): Promise<void> {
    try {
      const permissionToDelete = await Permission.findByPk(id);

      if (!permissionToDelete) {
        throw new AppError('Permissão não encontrada.', 404);
      }

      await permissionToDelete.destroy();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao deletar permissão: ', error);
      throw new AppError(
        'Não foi possível deletar a permissão devido a um erro interno.',
        500,
      );
    }
  }
}
