import {
  CreateUserRoleDTO,
  PaginatedUserRoleDTO,
  SafeUserRoleDTO,
  UpdateUserRoleDTO,
} from './userRole.dtos.js';
import { AppError } from '../../utils/AppError.js';
import { UserRole } from './userRole.js';
import { Role } from '../role/role.js';
import { User } from '../user/user.js';
import { sequelize } from '../../models/index.js';

export class UserRoleService {
  /**
   * Creates a new userRole.
   * @param userRoleData - DTO with the userRole data.
   * @returns The updated userRole object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async create(
    userRoleData: CreateUserRoleDTO,
  ): Promise<SafeUserRoleDTO> {
    try {
      const newUserRole = await sequelize.transaction(async (t) => {
        const userRole = await UserRole.create(userRoleData, {
          transaction: t,
        });

        const [userExists, roleExists] = await Promise.all([
          await User.findByPk(userRoleData.user_id, { transaction: t }),
          await Role.findByPk(userRoleData.role_id, { transaction: t }),
        ]);

        if (!userExists) {
          throw new AppError('Usuário não encontrado.', 404);
        }

        if (!roleExists) {
          throw new AppError('Papel não encontrado.', 404);
        }

        return userRole;
      });

      return newUserRole as SafeUserRoleDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar atribuição de papel ao usuário: ', error);
      throw new AppError(
        'Não foi possível criar a atribuição de papel ao usuário devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search for a userRole by its id, includes important associations.
   * @param id - userRole id.
   * @returns The updated userRole object.
   * @throws AppError if the userRole does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findById(id: string): Promise<SafeUserRoleDTO> {
    try {
      const userRole = await UserRole.findByPk(id);

      if (!userRole) {
        throw new AppError(
          'Atribuição de papel ao usuário não encontrada.',
          404,
        );
      }

      return userRole as SafeUserRoleDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar atribuição de papel ao usuário: ', error);
      throw new AppError(
        'Não foi possível buscar a atribuição de papel ao usuário deviado a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search all userRoles, includes important associations.
   * @param page - the page number to return.
   * @param limit - the limit number per page.
   * @returns An object with the pagination data and the userRole list.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedUserRoleDTO> {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await UserRole.findAndCountAll({
        limit,
        offset,
      });

      return {
        totalItems: count,
        userRoles: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error(
        'Erro ao buscar atribuições de papeis aos usuários: ',
        error,
      );
      throw new AppError(
        'Não foi possível buscar as atribuições de papeis aos usuários devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Updates an existing userRole.
   * @param id - userRole id.
   * @param userRoleData - DTO with the updated userRole data.
   * @returns The updated userRole object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async update(
    id: string,
    userRoleData: UpdateUserRoleDTO,
  ): Promise<SafeUserRoleDTO> {
    try {
      const userRoleToUpdate = await UserRole.findByPk(id);

      if (!userRoleToUpdate) {
        throw new AppError(
          'Atribuição de papel ao usuário não encontrada.',
          404,
        );
      }

      if (userRoleData.user_id) {
        const userExists = await User.findByPk(userRoleData.user_id);

        if (!userExists) {
          throw new AppError('Usuário não encontrado.', 404);
        }
      }

      if (userRoleData.role_id) {
        const roleExists = await Role.findByPk(userRoleData.role_id);

        if (!roleExists) {
          throw new AppError('Papel não encontrado.', 404);
        }
      }

      await userRoleToUpdate.update(userRoleData);

      const updatedUserRole = await UserRole.findByPk(id);

      if (!updatedUserRole) {
        throw new AppError(
          'Falha ao buscar atribuição de papel ao usuário atualizada.',
          404,
        );
      }

      return updatedUserRole as SafeUserRoleDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error(
        'Erro ao atualizar atribuição de papel ao usuário: ',
        error,
      );
      throw new AppError(
        'Não foi possível atualizar a atribuição de papel ao usuário devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Delete userRole.
   * @param id - userRole id.
   * @returns The deleted userRole object.
   * @throws AppError if the userRole does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async delete(id: string): Promise<void> {
    try {
      const userRoleToDelete = await UserRole.findByPk(id);

      if (!userRoleToDelete) {
        throw new AppError(
          'Atribuição de papel ao usuário não encontrada.',
          404,
        );
      }

      await userRoleToDelete.destroy();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao deletar atribuição de papel ao usuário: ', error);
      throw new AppError(
        'Não foi possível deletar a atribuição de papel ao usuário devido a um erro interno.',
        500,
      );
    }
  }
}
