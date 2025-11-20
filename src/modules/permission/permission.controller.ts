import { Request, Response, NextFunction } from 'express';
import { PermissionService } from './permission.service.js';
import {
  CreatePermissionDTO,
  UpdatePermissionDTO,
  SafePermissionDTO,
  PaginatedPermissionDTO,
} from './permission.dtos.js';

const permissionService = new PermissionService();

export class PermissionController {
  /**
   * Creates a new permission
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const permissionData: CreatePermissionDTO = req.body;

      const newPermission: SafePermissionDTO =
        await permissionService.create(permissionData);
      res.status(201).json({ success: true, data: newPermission });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search the permission by id
   */
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const permission: SafePermissionDTO =
        await permissionService.findById(id);
      res.status(200).json({ success: true, data: permission });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search all permissions
   */
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const permissions: PaginatedPermissionDTO =
        await permissionService.findAll(page, limit);
      res.status(200).json({ success: true, data: permissions });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * update the permission by id
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const permissionData: UpdatePermissionDTO = req.body;

      const updatedPermission: SafePermissionDTO =
        await permissionService.update(id, permissionData);
      res.status(200).json({ success: true, data: updatedPermission });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * delete the permission by id
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await permissionService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
