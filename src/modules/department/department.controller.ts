import { Request, Response, NextFunction } from 'express';
import { DepartmentService } from './department.service.js';
import {
  CreateDepartmentDTO,
  UpdateDepartmentDTO,
  SafeDepartmentDTO,
  PaginatedDepartmentDTO,
} from './department.dtos.js';

const departmentService = new DepartmentService();

export class DepartmentController {
  /**
   * Creates a new department
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const departmentData: CreateDepartmentDTO = req.body;

      const newDepartment: SafeDepartmentDTO =
        await departmentService.create(departmentData);
      res.status(201).json({ success: true, data: newDepartment });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search the department by id
   */
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const department: SafeDepartmentDTO =
        await departmentService.findById(id);
      res.status(200).json({ success: true, data: department });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search all departments
   */
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const departments: PaginatedDepartmentDTO =
        await departmentService.findAll(page, limit);
      res.status(200).json({ success: true, data: departments });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * update the department by id
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const departmentData: UpdateDepartmentDTO = req.body;

      const updatedDepartment: SafeDepartmentDTO =
        await departmentService.update(id, departmentData);
      res.status(200).json({ success: true, data: updatedDepartment });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * delete the department by id
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await departmentService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
