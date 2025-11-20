import { Request, Response, NextFunction } from 'express';
import { ProjectService } from './project.service.js';
import {
  CreateProjectDTO,
  UpdateProjectDTO,
  SafeProjectDTO,
  PaginatedProjectDTO,
} from './project.dtos.js';

const projectService = new ProjectService();

export class ProjectController {
  /**
   * Creates a new project
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const projectData: CreateProjectDTO = req.body;

      const newProject: SafeProjectDTO =
        await projectService.create(projectData);
      res.status(201).json({ success: true, data: newProject });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search the project by id
   */
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const project: SafeProjectDTO = await projectService.findById(id);
      res.status(200).json({ success: true, data: project });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * search all projects
   */
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const projects: PaginatedProjectDTO = await projectService.findAll(
        page,
        limit,
      );
      res.status(200).json({ success: true, data: projects });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * update the project by id
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const projectData: UpdateProjectDTO = req.body;

      const updatedProject: SafeProjectDTO = await projectService.update(
        id,
        projectData,
      );
      res.status(200).json({ success: true, data: updatedProject });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * delete the project by id
   */
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      await projectService.delete(id);
      res.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  }
}
