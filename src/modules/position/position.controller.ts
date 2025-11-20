import { Request, Response, NextFunction } from 'express';
import { PositionService } from './position.service.js';
import {
  CreatePositionDTO,
  UpdatePositionDTO,
  SafePositionDTO,
  PaginatedPositionDTO,
} from './position.dtos.js';

const positionService = new PositionService();

export class PositionController {
  /**
   * Creates a new position
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const positionData: CreatePositionDTO = req.body;

      const newPosition: SafePositionDTO =
        await positionService.create(positionData);
      res.status(201).json({ success: true, data: newPosition });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search the position by id
   */
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const position: SafePositionDTO = await positionService.findById(id);
      res.status(200).json({ success: true, data: position });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search all positions
   */
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const positions: PaginatedPositionDTO = await positionService.findAll(
        page,
        limit,
      );
      res.status(200).json({ success: true, data: positions });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * update the position by id
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const positionData: UpdatePositionDTO = req.body;

      const updatedPosition: SafePositionDTO = await positionService.update(
        id,
        positionData,
      );
      res.status(200).json({ success: true, data: updatedPosition });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * delete the position by id
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await positionService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
