import {
  CreateRoleDTO,
  PaginatedRoleDTO,
  SafeRoleDTO,
  UpdateRoleDTO,
} from './role.dtos.js';
import { AppError } from '../../utils/AppError.js';
import { Role } from './role.js';
import { sequelize } from '../../models/index.js';

export class RoleService {
  /**
   * Creates a new role.
   * @param roleData - DTO with the role data.
   * @returns The updated role object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async create(roleData: CreateRoleDTO): Promise<SafeRoleDTO> {
    try {
      const newRole = await sequelize.transaction(async (t) => {
        const role = await Role.create(roleData, { transaction: t });

        return role;
      });

      return newRole as SafeRoleDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar papel: ', error);
      throw new AppError(
        'Não foi possível criar o papel devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search for a role by its id, includes important associations.
   * @param id - role id.
   * @returns The updated role object.
   * @throws AppError if the role does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findById(id: string): Promise<SafeRoleDTO> {
    try {
      const role = await Role.findByPk(id);

      if (!role) {
        throw new AppError('Permissão não encontrada.', 404);
      }

      return role as SafeRoleDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar papel: ', error);
      throw new AppError(
        'Não foi possível buscar o papel deviado a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search all roles, includes important associations.
   * @param page - the page number to return.
   * @param limit - the limit number per page.
   * @returns An object with the pagination data and the role list.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedRoleDTO> {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await Role.findAndCountAll({
        limit,
        offset,
      });

      return {
        totalItems: count,
        roles: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar papeis: ', error);
      throw new AppError(
        'Não foi possível buscar os papeis devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Updates an existing role.
   * @param id - role id.
   * @param roleData - DTO with the updated role data.
   * @returns The updated role object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async update(
    id: string,
    roleData: UpdateRoleDTO,
  ): Promise<SafeRoleDTO> {
    try {
      const roleToUpdate = await Role.findByPk(id);

      if (!roleToUpdate) {
        throw new AppError('Papel não encontrado.', 404);
      }

      await roleToUpdate.update(roleData);

      const updatedRole = await Role.findByPk(id);

      if (!updatedRole) {
        throw new AppError('Falha ao buscar papel atualizado.', 404);
      }

      return updatedRole as SafeRoleDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao atualizar papel: ', error);
      throw new AppError(
        'Não foi possível atualizar o papel devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Delete role.
   * @param id - role id.
   * @returns The deleted role object.
   * @throws AppError if the role does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async delete(id: string): Promise<void> {
    try {
      const roleToDelete = await Role.findByPk(id);

      if (!roleToDelete) {
        throw new AppError('Permissão não encontrada.', 404);
      }

      await roleToDelete.destroy();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao deletar papel: ', error);
      throw new AppError(
        'Não foi possível deletar o papel devido a um erro interno.',
        500,
      );
    }
  }
}
