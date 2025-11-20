import {
  CreatePositionDTO,
  PaginatedPositionDTO,
  SafePositionDTO,
  UpdatePositionDTO,
} from './position.dtos.js';
import { AppError } from '../../utils/AppError.js';
import { Position } from './position.js';
import { sequelize } from '../../models/index.js';

export class PositionService {
  /**
   * Creates a new position.
   * @param positionData - DTO with the position data.
   * @returns The updated position object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async create(
    positionData: CreatePositionDTO,
  ): Promise<SafePositionDTO> {
    try {
      const newPosition = await sequelize.transaction(async (t) => {
        const position = await Position.create(positionData, {
          transaction: t,
        });

        return position;
      });

      return newPosition as SafePositionDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar a posição: ', error);
      throw new AppError(
        'Não foi possível criar a posição devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search for a position by its id, includes important associations.
   * @param id - position id.
   * @returns The updated position object.
   * @throws AppError if the position does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findById(id: string): Promise<SafePositionDTO> {
    try {
      const position = await Position.findByPk(id);

      if (!position) {
        throw new AppError('Posição não encontrada.', 404);
      }

      return position as SafePositionDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar posição: ', error);
      throw new AppError(
        'Não foi possível buscar a posição deviado a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search all positions, includes important associations.
   * @param page - the page number to return.
   * @param limit - the limit number per page.
   * @returns An object with the pagination data and the position list.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedPositionDTO> {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await Position.findAndCountAll({
        limit,
        offset,
      });

      return {
        totalItems: count,
        positions: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar posições: ', error);
      throw new AppError(
        'Não foi possível buscar as posições devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Updates an existing position.
   * @param id - position id.
   * @param positionData - DTO with the updated position data.
   * @returns The updated position object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async update(
    id: string,
    positionData: UpdatePositionDTO,
  ): Promise<SafePositionDTO> {
    try {
      const positionToUpdate = await Position.findByPk(id);

      if (!positionToUpdate) {
        throw new AppError('Posição não encontrada.', 404);
      }

      await positionToUpdate.update(positionData);

      const updatedPosition = await Position.findByPk(id);

      if (!updatedPosition) {
        throw new AppError('Falha ao buscar posição atualizada.', 404);
      }

      return updatedPosition as SafePositionDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao atualizar posição: ', error);
      throw new AppError(
        'Não foi possível atualizar a posição devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Delete position.
   * @param id - position id.
   * @returns The deleted position object.
   * @throws AppError if the position does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async delete(id: string): Promise<void> {
    try {
      const positionToDelete = await Position.findByPk(id);

      if (!positionToDelete) {
        throw new AppError('Posição não encontrada.', 404);
      }

      await positionToDelete.destroy();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao deletar posição: ', error);
      throw new AppError(
        'Não foi possível deletar a posição devido a um erro interno.',
        500,
      );
    }
  }
}
