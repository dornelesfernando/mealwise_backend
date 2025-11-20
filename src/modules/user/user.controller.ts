import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service.js';
import {
  CreateUserDTO,
  UpdateUserDTO,
  SafeUserDTO,
  PaginatedUsersDTO,
} from './user.dtos.js';

const userService = new UserService();

export class UserController {
  /**
   * Creates a new user
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userData: CreateUserDTO = req.body;

      const newUser: SafeUserDTO = await userService.create(userData);
      res.status(201).json({ success: true, data: newUser });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search the user by id
   */
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const user: SafeUserDTO = await userService.findById(id);
      res.status(200).json({ success: true, data: user });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search all users
   */
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const users: PaginatedUsersDTO = await userService.findAll(page, limit);
      res.status(200).json({ success: true, data: users });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * update the user by id
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const userData: UpdateUserDTO = req.body;

      const updatedUser: SafeUserDTO = await userService.update(id, userData);
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * delete the user by id
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await userService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
