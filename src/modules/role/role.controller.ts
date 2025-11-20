import { Request, Response, NextFunction } from 'express';
import { RoleService } from './role.service.js';
import {
  CreateRoleDTO,
  UpdateRoleDTO,
  SafeRoleDTO,
  PaginatedRoleDTO,
} from './role.dtos.js';

const roleService = new RoleService();

export class RoleController {
  /**
   * Creates a new role
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const roleData: CreateRoleDTO = req.body;

      const newRole: SafeRoleDTO = await roleService.create(roleData);
      res.status(201).json({ success: true, data: newRole });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search the role by id
   */
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const role: SafeRoleDTO = await roleService.findById(id);
      res.status(200).json({ success: true, data: role });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search all roles
   */
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const roles: PaginatedRoleDTO = await roleService.findAll(page, limit);
      res.status(200).json({ success: true, data: roles });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * update the role by id
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const roleData: UpdateRoleDTO = req.body;

      const updatedRole: SafeRoleDTO = await roleService.update(id, roleData);
      res.status(200).json({ success: true, data: updatedRole });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * delete the role by id
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await roleService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
