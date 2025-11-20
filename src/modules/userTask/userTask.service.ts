import {
  CreateUserTaskDTO,
  PaginatedUserTaskDTO,
  SafeUserTaskDTO,
  UpdateUserTaskDTO,
} from './userTask.dtos.js';
import { AppError } from '../../utils/AppError.js';
import { UserTask } from './userTask.js';
import { sequelize } from '../../models/index.js';
import { Task } from '../task/task.js';
import { User } from '../user/user.js';

export class UserTaskService {
  /**
   * Creates a new userTask.
   * @param userTaskData - DTO with the userTask data.
   * @returns The updated userTask object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async create(
    userTaskData: CreateUserTaskDTO,
  ): Promise<SafeUserTaskDTO> {
    try {
      const newUserTask = await sequelize.transaction(async (t) => {
        const userTask = await UserTask.create(userTaskData, {
          transaction: t,
        });

        const [userExists, taskExists] = await Promise.all([
          await User.findByPk(userTaskData.user_id, { transaction: t }),
          await Task.findByPk(userTaskData.task_id, { transaction: t }),
        ]);

        if (!userExists) {
          throw new AppError('Usuário não encontrado.', 404);
        }

        if (!taskExists) {
          throw new AppError('Tarefa não encontrada.', 404);
        }

        return userTask;
      });

      return newUserTask as SafeUserTaskDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar atribuição de tarefa ao usuário: ', error);
      throw new AppError(
        'Não foi possível criar a atribuição de tarefa ao usuário devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search for a userTask by its id, includes important associations.
   * @param id - userTask id.
   * @returns The updated userTask object.
   * @throws AppError if the userTask does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findById(id: string): Promise<SafeUserTaskDTO> {
    try {
      const userTask = await UserTask.findByPk(id);

      if (!userTask) {
        throw new AppError(
          'Atribuição de tarefa ao usuário não encontrada.',
          404,
        );
      }

      return userTask as SafeUserTaskDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar atribuição de tarefa ao usuário: ', error);
      throw new AppError(
        'Não foi possível buscar a atribuição de tarefa ao usuário deviado a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search all userTasks, includes important associations.
   * @param page - the page number to return.
   * @param limit - the limit number per page.
   * @returns An object with the pagination data and the userTask list.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedUserTaskDTO> {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await UserTask.findAndCountAll({
        limit,
        offset,
      });

      return {
        totalItems: count,
        userTasks: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error(
        'Erro ao buscar atribuições de tarefas aos usuários: ',
        error,
      );
      throw new AppError(
        'Não foi possível buscar as atribuições de tarefas aos usuários devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Updates an existing userTask.
   * @param id - userTask id.
   * @param userTaskData - DTO with the updated userTask data.
   * @returns The updated userTask object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async update(
    id: string,
    userTaskData: UpdateUserTaskDTO,
  ): Promise<SafeUserTaskDTO> {
    try {
      const userTaskToUpdate = await UserTask.findByPk(id);

      if (!userTaskToUpdate) {
        throw new AppError(
          'Atribuição de tarefa ao usuário não encontrada.',
          404,
        );
      }

      if (userTaskData.user_id) {
        const userExists = await User.findByPk(userTaskData.user_id);

        if (!userExists) {
          throw new AppError('Usuário não encontrado.', 404);
        }
      }

      if (userTaskData.task_id) {
        const taskExists = await Task.findByPk(userTaskData.task_id);

        if (!taskExists) {
          throw new AppError('Tarefa não encontrada.', 404);
        }
      }

      await userTaskToUpdate.update(userTaskData);

      const updatedUserTask = await UserTask.findByPk(id);

      if (!updatedUserTask) {
        throw new AppError(
          'Falha ao buscar atribuição de tarefa ao usuário atualizada.',
          404,
        );
      }

      return updatedUserTask as SafeUserTaskDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error(
        'Erro ao atualizar atribuição de tarefa ao usuário: ',
        error,
      );
      throw new AppError(
        'Não foi possível atualizar a atribuição de tarefa ao usuário devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Delete userTask.
   * @param id - userTask id.
   * @returns The deleted userTask object.
   * @throws AppError if the userTask does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async delete(id: string): Promise<void> {
    try {
      const userTaskToDelete = await UserTask.findByPk(id);

      if (!userTaskToDelete) {
        throw new AppError(
          'Atribuição de tarefa ao usuário não encontrada.',
          404,
        );
      }

      await userTaskToDelete.destroy();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao deletar atribuição de tarefa ao usuário: ', error);
      throw new AppError(
        'Não foi possível deletar a atribuição de tarefa ao usuário devido a um erro interno.',
        500,
      );
    }
  }
}
