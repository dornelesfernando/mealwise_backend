import {
  CreateHourLogDTO,
  PaginatedHourLogDTO,
  SafeHourLogDTO,
  UpdateHourLogDTO,
} from './hourLog.dtos.js';
import { AppError } from '../../utils/AppError.js';
import { HourLog } from './hourLog.js';
import { User } from '../user/user.js';
import { Task } from '../task/task.js';
import { sequelize } from '../../models/index.js';
import { useParseTime } from '../../hooks/time/useParseTime.js';
import { convertMinutesToHours } from '../../hooks/time/convertMinutesToHour.js';

export class HourLogService {
  /**
   * Creates a new hourLog.
   * @param hourLogData - DTO with the hourLog data.
   * @returns The updated hourLog object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async create(hourLogData: CreateHourLogDTO): Promise<SafeHourLogDTO> {
    try {
      const newHourLog = await sequelize.transaction(async (t) => {
        const { task_id, user_id, start_time, end_time } = hourLogData;

        const [taskExists, userExists] = await Promise.all([
          await Task.findByPk(task_id),
          await User.findByPk(user_id),
        ]);

        if (!taskExists) {
          throw new AppError('Tarefa não encontrada.', 404);
        }

        if (!userExists) {
          throw new AppError('Usuário não encontrado.', 404);
        }

        const parsedStartTime = useParseTime(start_time);

        if (!parsedStartTime.isValid) {
          throw new AppError('Hora inicial não possui um formato válido.', 400);
        }

        if (end_time) {
          const parsedEndTime = useParseTime(end_time);

          if (!parsedEndTime.isValid) {
            throw new AppError('Hora final não possui um formato válido.', 400);
          }

          const startInMinutes =
            parsedStartTime.hours! * 60 + parsedStartTime.minutes!;
          const endInMinutes =
            parsedEndTime.hours! * 60 + parsedEndTime.minutes!;
          const durationInMinutes = endInMinutes - startInMinutes;

          if (durationInMinutes <= 0) {
            throw new AppError(
              'A hora final deve ser maior que a hora inicial.',
              400,
            );
          }

          hourLogData.hours_worked = convertMinutesToHours(durationInMinutes);
        }

        const hourLog = await HourLog.create(hourLogData, { transaction: t });

        return hourLog;
      });

      return newHourLog as SafeHourLogDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar o registro de horas: ', error);
      throw new AppError(
        'Não foi possível criar o registro de horas devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search for a hourLog by its id, includes important associations.
   * @param id - hourLog id.
   * @returns The updated hourLog object.
   * @throws AppError if the hourLog does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findById(id: string): Promise<SafeHourLogDTO> {
    try {
      const hourLog = await HourLog.findByPk(id, {
        include: [
          { association: 'task', attributes: ['id', 'name', 'status'] },
          { association: 'user', attributes: ['id', 'name', 'email'] },
        ],
      });

      if (!hourLog) {
        throw new AppError('Registro de horas não encontrado.', 404);
      }

      return hourLog as SafeHourLogDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar registro de horas: ', error);
      throw new AppError(
        'Não foi possível buscar o registro de horas deviado a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search all hourLogs, includes important associations.
   * @param page - the page number to return.
   * @param limit - the limit number per page.
   * @returns An object with the pagination data and the hourLog list.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedHourLogDTO> {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await HourLog.findAndCountAll({
        limit,
        offset,
        include: [
          { association: 'task', attributes: ['id', 'name', 'status'] },
          { association: 'user', attributes: ['id', 'name', 'email'] },
        ],
      });

      return {
        totalItems: count,
        hourLogs: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar registros de hora: ', error);
      throw new AppError(
        'Não foi possível buscar os registros de hora devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Updates an existing hourLog.
   * @param id - hourLog id.
   * @param hourLogData - DTO with the updated hourLog data.
   * @returns The updated hourLog object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async update(
    id: string,
    hourLogData: UpdateHourLogDTO,
  ): Promise<SafeHourLogDTO> {
    try {
      const hourLogToUpdate = await HourLog.findByPk(id);

      const { task_id, user_id, approver_id, start_time, end_time } =
        hourLogData;

      if (!hourLogToUpdate) {
        throw new AppError('Registro de hora não encontrado.', 404);
      }

      if (task_id) {
        const taskExists = await User.findByPk(task_id);

        if (!taskExists) {
          throw new AppError('Tarefa não encontrada.', 404);
        }
      }

      if (user_id) {
        const userExists = await User.findByPk(user_id);

        if (!userExists) {
          throw new AppError('Usuário não encontrado.', 404);
        }
      }
      if (approver_id) {
        const approverExists = await User.findByPk(approver_id);

        if (!approverExists) {
          throw new AppError('Aprovador não encontrado.', 404);
        }
      }

      if (start_time || end_time) {
        const newStartTime = start_time || hourLogToUpdate.start_time;

        const parsedStartTime = useParseTime(newStartTime);

        if (!parsedStartTime.isValid) {
          throw new AppError('Hora inicial não possui um formato válido.', 400);
        }

        const newEndTime = end_time || hourLogToUpdate.end_time;

        if (newEndTime) {
          const parsedEndTime = useParseTime(newEndTime);

          if (!parsedEndTime.isValid) {
            throw new AppError('Hora final não possui um formato válido.', 400);
          }

          const startInMinutes =
            parsedStartTime.hours! * 60 + parsedStartTime.minutes!;
          const endInMinutes =
            parsedEndTime.hours! * 60 + parsedEndTime.minutes!;
          const durationInMinutes = endInMinutes - startInMinutes;

          if (durationInMinutes <= 0) {
            throw new AppError(
              'A hora final deve ser maior que a hora inicial.',
              400,
            );
          }

          hourLogData.hours_worked = convertMinutesToHours(durationInMinutes);
        }
      }

      await hourLogToUpdate.update(hourLogData);

      const updatedHourLog = await HourLog.findByPk(id, {
        include: [
          { association: 'task', attributes: ['id', 'name', 'status'] },
          { association: 'user', attributes: ['id', 'name', 'email'] },
        ],
      });

      if (!updatedHourLog) {
        throw new AppError('Falha ao buscar registro de hora atualizado.', 404);
      }

      return updatedHourLog as SafeHourLogDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao atualizar registro de hora: ', error);
      throw new AppError(
        'Não foi possível atualizar o registro de hora devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Delete hourLog.
   * @param id - hourLog id.
   * @returns The deleted hourLog object.
   * @throws AppError if the hourLog does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async delete(id: string): Promise<void> {
    try {
      const hourLogToDelete = await HourLog.findByPk(id);

      if (!hourLogToDelete) {
        throw new AppError('Registro de hora não encontrado.', 404);
      }

      await hourLogToDelete.destroy();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao deletar registro de hora: ', error);
      throw new AppError(
        'Não foi possível deletar o registro de hora devido a um erro interno.',
        500,
      );
    }
  }
}
