import {
  CreateProjectDTO,
  PaginatedProjectDTO,
  SafeProjectDTO,
  UpdateProjectDTO,
} from './project.dtos.js';
import { AppError } from '../../utils/AppError.js';
import { User } from '../user/user.js';
import { Project } from './project.js';
import { sequelize } from '../../models/index.js';
import { Enums } from '../../enums/Enums.js';

// List of statuses that are allowed when creating a project
const validStatusForCreation = [
  Enums.Status.Pending,
  Enums.Status.InProgress,
  Enums.Status.OnHold,
  Enums.Status.WaitingForApproval,
  Enums.Status.WaitingForDependencies,
  Enums.Status.WaitingForResources,
];

export class ProjectService {
  /**
   * Creates a new project.
   * @param projectData - DTO with the project data.
   * @returns The updated project object.
   * @throws AppError if the manager does not exist.
   * @since 0.0.33
   * @author Eng. G. Dorneles, Fernando
   */
  public async create(projectData: CreateProjectDTO): Promise<SafeProjectDTO> {
    try {
      const newProject = await sequelize.transaction(async (t) => {
        // Check if the managerId exists
        const creatorExist = await User.findByPk(projectData.manager_id);

        if (!creatorExist) {
          throw new AppError('Gerente do projeto não encontrado.', 404);
        }

        if (!validStatusForCreation.includes(projectData.status)) {
          throw new AppError(
            'Este status não é válido para criação de um novo projeto.',
            404,
          );
        }

        if (projectData.parent_id) {
          const parentExists = await Project.findByPk(projectData.parent_id);

          if (!parentExists) {
            throw new AppError('Projeto pai não encontrado.', 404);
          }
        }

        const project = await Project.create(projectData, { transaction: t });

        return project;
      });

      return newProject as SafeProjectDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar projeto: ', error);
      throw new AppError(
        'Não foi possível criar o projeto devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search for a project by its id, includes important associations.
   * @param id - project id.
   * @returns The updated project object.
   * @throws AppError if the project does not exist.
   * @since 0.0.33
   * @author Eng. G. Dorneles, Fernando
   */
  public async findById(id: string): Promise<SafeProjectDTO> {
    try {
      const project = await Project.findByPk(id, {
        include: [
          { association: 'manager', attributes: ['id', 'name', 'email'] },
          { association: 'tasks', attributes: ['id', 'name', 'status'] },
        ],
      });

      if (!project) {
        throw new AppError('Projeto não encontrado.', 404);
      }

      return project as SafeProjectDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar projeto: ', error);
      throw new AppError(
        'Não foi possível buscar o projeto deviado a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search all projects, includes important associations.
   * @param page - the page number to return.
   * @param limit - the limit number per page.
   * @returns An object with the pagination data and the project list.
   * @since 0.0.33
   * @author Eng. G. Dorneles, Fernando
   */
  public async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedProjectDTO> {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await Project.findAndCountAll({
        limit,
        offset,
        include: [
          { association: 'manager', attributes: ['id', 'name', 'email'] },
          { association: 'tasks', attributes: ['id', 'name', 'status'] },
        ],
      });

      return {
        totalItems: count,
        projects: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar projetos: ', error);
      throw new AppError(
        'Não foi possível buscar os projetos devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Updates an existing project.
   * @param id - project id.
   * @param projectData - DTO with the updated project data.
   * @throws AppError if the manager or project does not exist.
   * @returns The updated project object.
   * @since 0.0.33
   * @author Eng. G. Dorneles, Fernando
   */
  public async update(
    id: string,
    projectData: UpdateProjectDTO,
  ): Promise<SafeProjectDTO> {
    try {
      const projectToUpdate = await Project.findByPk(id);

      if (!projectToUpdate) {
        throw new AppError('Projeto não encontrado.', 404);
      }

      if (projectData.manager_id) {
        const managerExists = await User.findByPk(projectData.manager_id);

        if (!managerExists) {
          throw new AppError('Gerente do projeto não encontrado.', 404);
        }
      }

      if (projectData.parent_id) {
        const parentExists = await Project.findByPk(projectData.parent_id);

        if (!parentExists) {
          throw new AppError('Projeto pai não encontrado.', 404);
        }
      }

      await projectToUpdate.update(projectData);

      const updatedProject = await Project.findByPk(id, {
        include: [
          { association: 'manager', attributes: ['id', 'name', 'email'] },
          { association: 'tasks', attributes: ['id', 'name', 'status'] },
        ],
      });

      if (!updatedProject) {
        throw new AppError('Falha ao buscar projeto atualizado.', 404);
      }

      return updatedProject as SafeProjectDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao atualizar projeto: ', error);
      throw new AppError(
        'Não foi possível atualizar o projeto devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * "Delete" project.
   * @param id - project id.
   * @returns The deleted project object.
   * @throws AppError if the project does not exist.
   * @since 0.0.33
   * @author Eng. G. Dorneles, Fernando
   */
  public async delete(id: string): Promise<SafeProjectDTO> {
    try {
      const projectToDelete = await Project.findByPk(id);

      if (!projectToDelete) {
        throw new AppError('Projeto não encontrado.', 404);
      }

      await projectToDelete.update({ status: Enums.Status.Deleted });

      return projectToDelete as SafeProjectDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao deletar projeto: ', error);
      throw new AppError(
        'Não foi possível deletar o projeto devido a um erro interno.',
        500,
      );
    }
  }
}
