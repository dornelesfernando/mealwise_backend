import {
  CreateUserDTO,
  UpdateUserDTO,
  SafeUserDTO,
  PaginatedUsersDTO,
} from './user.dtos.js';
import { User } from './user.js';
import { AppError } from '../../utils/AppError.js';
import { sequelize } from '../../models/index.js';

import bcrypt from 'bcryptjs';
import { hashPassword } from '../../hooks/crypto.js';
import { Position } from '../position/position.js';
import { Department } from '../department/department.js';

type UpdatePayload = UpdateUserDTO & {
  password_hash?: string;
};

export class UserService {
  /**
   * Creates a new user, ensuring password encryption.
   * @param userData - DTO with the new user's data.
   * @returns The created user object, without the password hash.
   * @throws AppError if a user with the same email address already exists.
   * @since 0.0.26
   * @author Eng. G. Dorneles, Fernando
   */
  public async create(userData: CreateUserDTO): Promise<SafeUserDTO> {
    try {
      const { position_id, department_id, supervisor_id } = userData;
      const { password, ...rest } = userData;

      const newUser = await sequelize.transaction(async (t) => {
        const existingUser = await User.findOne({
          where: { email: userData.email },
          transaction: t,
        });

        if (existingUser) {
          throw new AppError(
            'Já existe um usuário cadastrado com este e-mail.',
            409,
          );
        }

        const positionExists = await Position.findByPk(position_id);

        if (!positionExists) {
          throw new AppError('Posição não encontrada.', 404);
        }

        if (department_id) {
          const departmentExists = await Department.findByPk(department_id);

          if (!departmentExists) {
            throw new AppError('Departamento não encontrado.', 404);
          }
        }

        if (supervisor_id) {
          const supervisorExists = await User.findByPk(supervisor_id);

          if (!supervisorExists) {
            throw new AppError('Supervisor não encontrado.', 404);
          }
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create(
          {
            ...rest,
            password_hash: hashedPassword,
            password: '',
          },
          {
            transaction: t,
          },
        );

        return user;
      });

      const {
        password_hash: _unused_hash,
        password: _unused_pass,
        ...safeUser
      } = newUser.toJSON();
      return safeUser as SafeUserDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar usuário: ', error);
      throw new AppError(
        'Não foi possível criar o usuário devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Searches for a user by their ID, including relevant associations.
   * @param id - The ID of the user to search for.
   * @returns Returns the data for the searched user.
   * @throws AppError if the user is not found.
   * @since 0.0.26
   * @author Eng. G. Dorneles, Fernando
   */
  public async findById(id: string): Promise<SafeUserDTO> {
    try {
      const user = await User.findByPk(id, {
        attributes: {
          exclude: ['password_hash', 'password'],
        },
        include: [
          { association: 'position' },
          { association: 'department' },
          { association: 'supervisor', attributes: ['id', 'name', 'email'] },
        ],
      });

      if (!user) {
        throw new AppError('Usuário não encontrado.', 404);
      }

      return user as SafeUserDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar usuário: ', error);
      throw new AppError(
        'Não foi possível buscar o usuário devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Searches for all active users with pagination.
   * @param page - The page number to return.
   * @param limit - The number of items per page.
   * @returns An object with the pagination data and the list of users.
   * @since 0.0.26
   * @author Eng. G. Dorneles, Fernando
   */
  public async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedUsersDTO> {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await User.findAndCountAll({
        where: { is_active: true },
        limit,
        offset,
        attributes: {
          exclude: ['password_hash'],
        },
        order: [['name', 'ASC']],
        include: [{ association: 'position' }, { association: 'department' }],
      });

      return {
        totalItems: count,
        users: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar usuários: ', error);
      throw new AppError(
        'Não foi possível buscar os usuários devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Updates an existing user.
   * @param id - user id.
   * @param userData - DTO with the updated user data.
   * @throws AppError if the user cannot be found.
   * @throws AppError if a user with the email address already exists.
   * @returns Returns the updated user data.
   * @since 0.0.26
   * @author Eng. G. Dorneles, Fernando
   */
  public async update(
    id: string,
    userData: UpdateUserDTO,
  ): Promise<SafeUserDTO> {
    try {
      const { position_id, department_id, supervisor_id } = userData;
      const userToUpdate = await User.findByPk(id);

      if (!userToUpdate) {
        throw new AppError('Usuário não encontrado.', 404);
      }

      if (userData.email && userData.email !== userToUpdate.email) {
        const existingUser = await User.findOne({
          where: { email: userData.email },
        });

        if (existingUser && existingUser.id !== id) {
          throw new AppError(
            'Já existe um usuário cadastrado com este e-mail.',
            409,
          );
        }
      }

      if (position_id) {
        const positionExists = await Position.findByPk(position_id);

        if (!positionExists) {
          throw new AppError('Posição não encontrada.', 404);
        }
      }

      if (department_id) {
        const departmentExists = await Position.findByPk(department_id);

        if (!departmentExists) {
          throw new AppError('Departamento não encontrado.', 404);
        }
      }

      if (supervisor_id) {
        const supervisorExists = await Position.findByPk(supervisor_id);

        if (!supervisorExists) {
          throw new AppError('Supervisor não encontrado.', 404);
        }
      }

      const updateData: UpdatePayload = { ...userData };

      if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password_hash = await bcrypt.hash(userData.password, salt);
        delete updateData.password;
      }

      await userToUpdate.update(updateData);

      const updatedUser = await User.findByPk(id, {
        attributes: {
          exclude: ['password_hash', 'password'],
        },
        include: [
          { association: 'position' },
          { association: 'department' },
          { association: 'supervisor', attributes: ['id', 'name', 'email'] },
        ],
      });

      if (!updatedUser) {
        throw new AppError('Falha ao buscar usuário atualizado.', 404);
      }

      const {
        password_hash: _unused_hash,
        password: _unused_pass,
        ...safeUser
      } = updatedUser!.toJSON();
      return safeUser as SafeUserDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao atualizar usuário: ', error);
      throw new AppError(
        'Não foi possível atualizar o usuário devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * "Delete" user.
   * @param id - user id.
   * @returns DTO with secuer data of deleted user object.
   * @throws AppError if the user does not exist.
   * @since 0.0.26
   * @author Eng. G. Dorneles, Fernando
   */
  public async delete(id: string): Promise<SafeUserDTO> {
    try {
      const userToDelete = await User.findByPk(id);

      if (!userToDelete) {
        throw new AppError('Usuário não encontrado.', 404);
      }

      await userToDelete.update({ is_active: false });

      const {
        password_hash: _unused_hash,
        password: _unused_pass,
        ...safeUser
      } = userToDelete.toJSON();
      return safeUser as SafeUserDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao deletar usuário: ', error);
      throw new AppError(
        'Não foi possível deletar o usuário devido a um erro interno.',
        500,
      );
    }
  }
}
