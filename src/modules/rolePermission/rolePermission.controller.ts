import { Request, Response, NextFunction } from 'express';
import { RolePermissionService } from './rolePermission.service.js';
import {
  CreateRolePermissionDTO,
  UpdateRolePermissionDTO,
  SafeRolePermissionDTO,
  PaginatedRolePermissionDTO,
} from './rolePermission.dtos.js';

const rolePermissionService = new RolePermissionService();

export class RolePermissionController {
  /**
   * Creates a new rolePermission
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const rolePermissionData: CreateRolePermissionDTO = req.body;

      const newRolePermission: SafeRolePermissionDTO =
        await rolePermissionService.create(rolePermissionData);
      res.status(201).json({ success: true, data: newRolePermission });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search the rolePermission by id
   */
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const rolePermission: SafeRolePermissionDTO =
        await rolePermissionService.findById(id);
      res.status(200).json({ success: true, data: rolePermission });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search all rolePermissions
   */
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const rolePermissions: PaginatedRolePermissionDTO =
        await rolePermissionService.findAll(page, limit);
      res.status(200).json({ success: true, data: rolePermissions });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * update the rolePermission by id
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const rolePermissionData: UpdateRolePermissionDTO = req.body;

      const updatedRolePermission: SafeRolePermissionDTO =
        await rolePermissionService.update(id, rolePermissionData);
      res.status(200).json({ success: true, data: updatedRolePermission });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * delete the rolePermission by id
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await rolePermissionService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
