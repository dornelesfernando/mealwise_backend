import {
  CreateDepartmentDTO,
  PaginatedDepartmentDTO,
  SafeDepartmentDTO,
  UpdateDepartmentDTO,
} from './department.dtos.js';
import { AppError } from '../../utils/AppError.js';
import { Department } from './department.js';
import { User } from '../user/user.js';
import { sequelize } from '../../models/index.js';

export class DepartmentService {
  /**
   * Creates a new department.
   * @param departmentData - DTO with the department data.
   * @returns The updated department object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async create(
    departmentData: CreateDepartmentDTO,
  ): Promise<SafeDepartmentDTO> {
    try {
      const newDepartment = await sequelize.transaction(async (t) => {
        const managerExists = await User.findByPk(departmentData.manager_id);

        if (!managerExists) {
          throw new AppError('Gerente não encontrado.', 404);
        }

        const department = await Department.create(departmentData, {
          transaction: t,
        });

        return department;
      });

      return newDepartment as SafeDepartmentDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar o departamento: ', error);
      throw new AppError(
        'Não foi possível criar o departamento devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search for a department by its id, includes important associations.
   * @param id - department id.
   * @returns The updated department object.
   * @throws AppError if the department does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findById(id: string): Promise<SafeDepartmentDTO> {
    try {
      const department = await Department.findByPk(id, {
        include: [
          { association: 'manager', attributes: ['id', 'name', 'email'] },
        ],
      });

      if (!department) {
        throw new AppError('Departamento não encontrado.', 404);
      }

      return department as SafeDepartmentDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar departamento: ', error);
      throw new AppError(
        'Não foi possível buscar o departamento deviado a um erro interno.',
        500,
      );
    }
  }

  /**
   * Search all departments, includes important associations.
   * @param page - the page number to return.
   * @param limit - the limit number per page.
   * @returns An object with the pagination data and the department list.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedDepartmentDTO> {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await Department.findAndCountAll({
        limit,
        offset,
        include: [
          { association: 'manager', attributes: ['id', 'name', 'email'] },
        ],
      });

      return {
        totalItems: count,
        departments: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar departamentos: ', error);
      throw new AppError(
        'Não foi possível buscar os departamentos devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Updates an existing department.
   * @param id - department id.
   * @param departmentData - DTO with the updated department data.
   * @returns The updated department object.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async update(
    id: string,
    departmentData: UpdateDepartmentDTO,
  ): Promise<SafeDepartmentDTO> {
    try {
      const departmentToUpdate = await Department.findByPk(id);

      if (!departmentToUpdate) {
        throw new AppError('Departamento não encontrado.', 404);
      }

      if (departmentData.manager_id) {
        const managerExists = await User.findByPk(departmentData.manager_id);

        if (!managerExists) {
          throw new AppError('Gerente não encontrado.', 404);
        }
      }

      await departmentToUpdate.update(departmentData);

      const updatedDepartment = await Department.findByPk(id, {
        include: [
          { association: 'manager', attributes: ['id', 'name', 'email'] },
        ],
      });

      if (!updatedDepartment) {
        throw new AppError('Falha ao buscar departamento atualizado.', 404);
      }

      return updatedDepartment as SafeDepartmentDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao atualizar departamento: ', error);
      throw new AppError(
        'Não foi possível atualizar o departamento devido a um erro interno.',
        500,
      );
    }
  }

  /**
   * Delete department.
   * @param id - department id.
   * @returns The deleted department object.
   * @throws AppError if the department does not exist.
   * @since 0.0.39
   * @author Eng. G. Dorneles, Fernando
   */
  public async delete(id: string): Promise<SafeDepartmentDTO> {
    try {
      const departmentToDelete = await Department.findByPk(id);

      if (!departmentToDelete) {
        throw new AppError('Departamento não encontrado.', 404);
      }

      await departmentToDelete.update({ is_active: false });

      return departmentToDelete as SafeDepartmentDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao deletar departamento: ', error);
      throw new AppError(
        'Não foi possível deletar o departamento devido a um erro interno.',
        500,
      );
    }
  }
}
