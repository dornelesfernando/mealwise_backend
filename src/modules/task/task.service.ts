import {
  CreateTaskDTO,
  UpdateTaskDTO,
  SafeTaskDTO,
  PaginatedTaskDTO,
} from './task.dtos.js';
import { sequelize } from '../../models/index.js';
import { Task } from './task.js';
import { Project } from '../project/project.js';
import { User } from '../user/user.js';
import { UserTask } from '../userTask/userTask.js';
import { AppError } from '../../utils/AppError.js';
import { Enums } from '../../enums/Enums.js';

// List of statuses that are allowed when creating a task
const validStatusForCreation = [
  Enums.Status.Pending,
  Enums.Status.InProgress,
  Enums.Status.OnHold,
  Enums.Status.WaitingForApproval,
  Enums.Status.WaitingForDependencies,
  Enums.Status.WaitingForResources,
];

export class TaskService {
  /**
   * Creates a new task.
   * @param taskData - DTO with the task data.
   * @returns The Created task object.
   * @throws AppError if the creator or the project does not exist.
   * @since 0.0.28
   * @author Eng. G. Dorneles, Fernando
   */
  public async create(taskData: CreateTaskDTO): Promise<SafeTaskDTO> {
    try {
      const { assigned_users, ...rest } = taskData;

      const newTask = await sequelize.transaction(async (t) => {
        // Verifica se o criador e o projeto existem
        const [creatorExists, projectExists] = await Promise.all([
          User.findByPk(rest.creator_id, { transaction: t }),
          Project.findByPk(rest.project_id, { transaction: t }),
        ]);

        if (!creatorExists) {
          throw new AppError('Criador da tarefa não encontrado.', 404);
        }

        if (!projectExists) {
          throw new AppError('Projeto não encontrado.', 404);
        }

        if (taskData.parent_id) {
          const parentExists = await Task.findByPk(taskData.parent_id);

          if (!parentExists) {
            throw new AppError('Tarefa pai não encontrada.', 404);
          }
        }

        if (!validStatusForCreation.includes(rest.status)) {
          throw new AppError(
            'Este status não é válido para criação de uma nova tarefa.',
            404,
          );
        }

        const task = await Task.create(rest, { transaction: t });

        if (assigned_users && assigned_users.length > 0) {
          const userTask = assigned_users.map((user_id) => ({
            user_id,
            task_id: task.id,
          }));
          await UserTask.bulkCreate(userTask, { transaction: t });
        }

        return task;
      });

      const createdTaskWithAssociations = await this.findById(newTask.id);
      return createdTaskWithAssociations as SafeTaskDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar tarefa: ', error);
      throw new AppError(
        'Não foi possível criar a tarefa devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Searches for a user by their ID, including relevant associations.
   * @param id - The ID of the user to search for.
   * @returns Returns the data for the searched user.
   * @throws AppError if the user is not found.
   * @since 0.0.29
   * @author Eng. G. Dorneles, Fernando
   */
  public async findById(id: string): Promise<SafeTaskDTO> {
    try {
      const task = await Task.findByPk(id, {
        include: [
          { association: 'parent' },
          { association: 'project', attributes: ['id', 'name', 'status'] },
          { association: 'creator', attributes: ['id', 'name', 'email'] },
          { association: 'assignedUsers', attributes: ['id', 'name', 'email'] },
          { association: 'attachments' },
          { association: 'hourLogs' },
        ],
      });

      if (!task) {
        throw new AppError('Tarefa não encontrada.', 404);
      }

      return task as SafeTaskDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar tarefa: ', error);
      throw new AppError(
        'Não foi possível buscar a tarefa devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Fetches all tasks.
   * @param page - The page number to return.
   * @param limit - The number of items per page.
   * @returns An object with the pagination data and the task list.
   * @since 0.0.29
   * @author Eng. G. Dorneles, Fernando
   */
  public async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedTaskDTO> {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await Task.findAndCountAll({
        limit,
        offset,
        order: [
          [
            sequelize.literal(`
                        CASE
                        WHEN "Task"."priority" = 'critical' THEN 1
                        WHEN "Task"."priority" = 'urgent' THEN 2
                        WHEN "Task"."priority" = 'high' THEN 3
                        WHEN "Task"."priority" = 'medium' THEN 4
                        WHEN "Task"."priority" = 'low' THEN 5
                        ELSE 6
                        END
                    `),
            'ASC',
          ],
        ],
        include: [
          { association: 'parent' },
          { association: 'project', attributes: ['id', 'name', 'status'] },
          { association: 'creator', attributes: ['id', 'name', 'email'] },
          { association: 'assignedUsers', attributes: ['id', 'name', 'email'] },
          { association: 'attachments' },
          { association: 'hourLogs' },
        ],
      });

      return {
        totalItems: count,
        tasks: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar tarefas: ', error);
      throw new AppError(
        'Não foi possível buscar as tarefas devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Updates an existing task
   * @param id - ID of the task you want to update.
   * @param userData - Data of the task you want to update.
   * @returns Returns the data of the updated task.
   * @throws AppError if the task is not found.
   * @throws AppError if the linked project is not found.
   * @since 0.0.29
   * @author Eng. G. Dorneles, Fernando
   */
  public async update(
    id: string,
    taskData: UpdateTaskDTO,
  ): Promise<SafeTaskDTO> {
    try {
      const taskToUpdate = await Task.findByPk(id);

      if (!taskToUpdate) {
        throw new AppError('Tarefa não encontrada.', 404);
      }

      if (taskData.parent_id) {
        const parentExists = await Task.findByPk(taskData.parent_id);

        if (!parentExists) {
          throw new AppError('Tarefa pai não encontrada.', 404);
        }
      }

      if (taskData.project_id) {
        const projectExists = await Project.findByPk(taskData.project_id);

        if (!projectExists) {
          throw new AppError('Projeto não encontrado.', 404);
        }
      }

      await taskToUpdate.update(taskData);

      const updatedTask = await Task.findByPk(id, {
        include: [
          { association: 'parent' },
          { association: 'project', attributes: ['id', 'name', 'status'] },
          { association: 'creator', attributes: ['id', 'name', 'email'] },
          { association: 'assignedUsers', attributes: ['id', 'name', 'email'] },
          { association: 'attachments' },
          { association: 'hourLogs' },
        ],
      });

      if (!updatedTask) {
        throw new AppError('Falha ao buscar tarefa atualizada.', 404);
      }

      return updatedTask as SafeTaskDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao atualizar tarefa: ', error);
      throw new AppError(
        'Não foi possível atualizar a tarefa devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * "Deleta" uma task definindo seu status como 'deleted'.
   * @param id - o ID da task que se deseja "deletar".
   * @throws AppError se a task não for encontrada.
   * @since 0.0.29
   * @author Eng. G. Dorneles, Fernando
   */
  public async delete(id: string): Promise<SafeTaskDTO> {
    try {
      const taskToDelete = await Task.findByPk(id);

      if (!taskToDelete) {
        throw new AppError('Tarefa não encontrada.', 404);
      }

      await taskToDelete.update({ status: Enums.Status.Deleted });

      return taskToDelete as SafeTaskDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao deletar tarefa: ', error);
      throw new AppError(
        'Não foi possível deletar a tarefa devido a um erro interno.',
        500,
      );
    }
  }
}
