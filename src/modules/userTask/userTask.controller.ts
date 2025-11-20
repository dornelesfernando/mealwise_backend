import { Request, Response, NextFunction } from 'express';
import { UserTaskService } from './userTask.service.js';
import {
  CreateUserTaskDTO,
  UpdateUserTaskDTO,
  SafeUserTaskDTO,
  PaginatedUserTaskDTO,
} from './userTask.dtos.js';

const userTaskService = new UserTaskService();

export class UserTaskController {
  /**
   * Creates a new userTask
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userTaskData: CreateUserTaskDTO = req.body;

      const newUserTask: SafeUserTaskDTO =
        await userTaskService.create(userTaskData);
      res.status(201).json({ success: true, data: newUserTask });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search the userTask by id
   */
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const userTask: SafeUserTaskDTO = await userTaskService.findById(id);
      res.status(200).json({ success: true, data: userTask });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search all userTasks
   */
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const userTasks: PaginatedUserTaskDTO = await userTaskService.findAll(
        page,
        limit,
      );
      res.status(200).json({ success: true, data: userTasks });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * update the userTask by id
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const userTaskData: UpdateUserTaskDTO = req.body;

      const updatedUserTask: SafeUserTaskDTO = await userTaskService.update(
        id,
        userTaskData,
      );
      res.status(200).json({ success: true, data: updatedUserTask });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * delete the userTask by id
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await userTaskService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
