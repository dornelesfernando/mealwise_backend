import { Request, Response, NextFunction } from 'express';
import { TaskService } from './task.service.js';
import {
  CreateTaskDTO,
  PaginatedTaskDTO,
  SafeTaskDTO,
  UpdateTaskDTO,
} from './task.dtos.js';

const taskService = new TaskService();

export class TaskController {
  /**
   * Creates a new task
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const taskData: CreateTaskDTO = req.body;

      const newTask: SafeTaskDTO = await taskService.create(taskData);
      res.status(201).json({ success: true, data: newTask });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search the task by id
   */
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const task: SafeTaskDTO = await taskService.findById(id);
      res.status(200).json({ success: true, data: task });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search all tasks
   */
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const tasks: PaginatedTaskDTO = await taskService.findAll(page, limit);
      res.status(200).json({ success: true, data: tasks });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * update the task by id
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const taskData: UpdateTaskDTO = req.body;

      const updatedTask: SafeTaskDTO = await taskService.update(id, taskData);
      res.status(200).json({ success: true, data: updatedTask });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * delete the task by id
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await taskService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
