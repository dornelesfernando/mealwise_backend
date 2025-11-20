import { Request, Response, NextFunction } from 'express';
import { HourLogService } from './hourLog.service.js';
import {
  CreateHourLogDTO,
  UpdateHourLogDTO,
  SafeHourLogDTO,
  PaginatedHourLogDTO,
} from './hourLog.dtos.js';

const hourLogService = new HourLogService();

export class HourLogController {
  /**
   * Creates a new hourLog
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const hourLogData: CreateHourLogDTO = req.body;

      const newHourLog: SafeHourLogDTO =
        await hourLogService.create(hourLogData);
      res.status(201).json({ success: true, data: newHourLog });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search the hourLog by id
   */
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const hourLog: SafeHourLogDTO = await hourLogService.findById(id);
      res.status(200).json({ success: true, data: hourLog });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search all hourLogs
   */
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const hourLogs: PaginatedHourLogDTO = await hourLogService.findAll(
        page,
        limit,
      );
      res.status(200).json({ success: true, data: hourLogs });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * update the hourLog by id
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const hourLogData: UpdateHourLogDTO = req.body;

      const updatedHourLog: SafeHourLogDTO = await hourLogService.update(
        id,
        hourLogData,
      );
      res.status(200).json({ success: true, data: updatedHourLog });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * delete the hourLog by id
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await hourLogService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
