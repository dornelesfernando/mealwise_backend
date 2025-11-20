import { Request, Response, NextFunction } from 'express';
import { UserRoleService } from './userRole.service.js';
import {
  CreateUserRoleDTO,
  UpdateUserRoleDTO,
  SafeUserRoleDTO,
  PaginatedUserRoleDTO,
} from './userRole.dtos.js';

const userRoleService = new UserRoleService();

export class UserRoleController {
  /**
   * Creates a new userRole
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userRoleData: CreateUserRoleDTO = req.body;

      const newUserRole: SafeUserRoleDTO =
        await userRoleService.create(userRoleData);
      res.status(201).json({ success: true, data: newUserRole });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search the userRole by id
   */
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const userRole: SafeUserRoleDTO = await userRoleService.findById(id);
      res.status(200).json({ success: true, data: userRole });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search all userRoles
   */
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const userRoles: PaginatedUserRoleDTO = await userRoleService.findAll(
        page,
        limit,
      );
      res.status(200).json({ success: true, data: userRoles });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * update the userRole by id
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const userRoleData: UpdateUserRoleDTO = req.body;

      const updatedUserRole: SafeUserRoleDTO = await userRoleService.update(
        id,
        userRoleData,
      );
      res.status(200).json({ success: true, data: updatedUserRole });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * delete the userRole by id
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await userRoleService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
