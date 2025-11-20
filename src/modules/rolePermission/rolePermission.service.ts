import {
  CreateRolePermissionDTO,
  PaginatedRolePermissionDTO,
  SafeRolePermissionDTO,
  UpdateRolePermissionDTO,
} from './rolePermission.dtos.js';
import { AppError } from '../../utils/AppError.js';
import { RolePermission } from './rolePermission.js';
import { Role } from '../role/role.js';
import { Permission } from '../permission/permission.js';
import { sequelize } from '../../models/index.js';

export class RolePermissionService {
  /**
   * Creates a new rolePermission.
   * @param rolePermissionData - DTO with the rolePermission data.
   * @returns The updated rolePermission object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async create(
    rolePermissionData: CreateRolePermissionDTO,
  ): Promise<SafeRolePermissionDTO> {
    try {
      const newRolePermission = await sequelize.transaction(async (t) => {
        const rolePermission = await RolePermission.create(rolePermissionData, {
          transaction: t,
        });

        const [roleExists, permissionExists] = await Promise.all([
          await Role.findByPk(rolePermissionData.role_id, { transaction: t }),
          await Permission.findByPk(rolePermissionData.permission_id, {
            transaction: t,
          }),
        ]);

        if (!roleExists) {
          throw new AppError('Papel não encontrado.', 404);
        }

        if (!permissionExists) {
          throw new AppError('Permissão não encontrada.', 404);
        }

        return rolePermission;
      });

      return newRolePermission as SafeRolePermissionDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar atribuição de permissão ao papel: ', error);
      throw new AppError(
        'Não foi possível criar a atribuição de permissão ao papel devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search for a rolePermission by its id, includes important associations.
   * @param id - rolePermission id.
   * @returns The updated rolePermission object.
   * @throws AppError if the rolePermission does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findById(id: string): Promise<SafeRolePermissionDTO> {
    try {
      const rolePermission = await RolePermission.findByPk(id);

      if (!rolePermission) {
        throw new AppError(
          'Atribuição de permissão ao papel não encontrada.',
          404,
        );
      }

      return rolePermission as SafeRolePermissionDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar atribuição de permissão ao papel: ', error);
      throw new AppError(
        'Não foi possível buscar a atribuição de permissão ao papel deviado a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search all rolePermissions, includes important associations.
   * @param page - the page number to return.
   * @param limit - the limit number per page.
   * @returns An object with the pagination data and the rolePermission list.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedRolePermissionDTO> {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await RolePermission.findAndCountAll({
        limit,
        offset,
      });

      return {
        totalItems: count,
        rolePermissions: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error(
        'Erro ao buscar atribuições de permissões aos papeis: ',
        error,
      );
      throw new AppError(
        'Não foi possível buscar as atribuições de permissão aos papeis devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Updates an existing rolePermission.
   * @param id - rolePermission id.
   * @param rolePermissionData - DTO with the updated rolePermission data.
   * @returns The updated rolePermission object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async update(
    id: string,
    rolePermissionData: UpdateRolePermissionDTO,
  ): Promise<SafeRolePermissionDTO> {
    try {
      const rolePermissionToUpdate = await RolePermission.findByPk(id);

      if (!rolePermissionToUpdate) {
        throw new AppError(
          'Atribuição de permissão ao papel não encontrada.',
          404,
        );
      }

      if (rolePermissionData.role_id) {
        const roleExists = await Role.findByPk(rolePermissionData.role_id);

        if (!roleExists) {
          throw new AppError('Papel não encontrado.', 404);
        }
      }

      if (rolePermissionData.permission_id) {
        const permissionExists = await Permission.findByPk(
          rolePermissionData.permission_id,
        );

        if (!permissionExists) {
          throw new AppError('Permissão não encontrada.', 404);
        }
      }

      await rolePermissionToUpdate.update(rolePermissionData);

      const updatedRolePermission = await RolePermission.findByPk(id);

      if (!updatedRolePermission) {
        throw new AppError(
          'Falha ao buscar atribuição de permissão ao papel atualizada.',
          404,
        );
      }

      return updatedRolePermission as SafeRolePermissionDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error(
        'Erro ao atualizar atribuição de permissão ao papel: ',
        error,
      );
      throw new AppError(
        'Não foi possível atualizar a atribuição de permissão ao papel devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Delete rolePermission.
   * @param id - rolePermission id.
   * @returns The deleted rolePermission object.
   * @throws AppError if the rolePermission does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async delete(id: string): Promise<void> {
    try {
      const rolePermissionToDelete = await RolePermission.findByPk(id);

      if (!rolePermissionToDelete) {
        throw new AppError(
          'Atribuição de permissão ao papel não encontrada.',
          404,
        );
      }

      await rolePermissionToDelete.destroy();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error(
        'Erro ao deletar atribuição de permissão ao papel: ',
        error,
      );
      throw new AppError(
        'Não foi possível deletar a atribuição de permissão ao papel devido a um erro interno.',
        500,
      );
    }
  }
}
