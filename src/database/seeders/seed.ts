import { sequelize } from '../../models/index.js';
import readline from 'readline';

import {
  Department,
  DepartmentCreationAttributes,
} from '../../modules/department/department.js';
import { User, UserCreationAttributes } from '../../modules/user/user.js';
import {
  Project,
  ProjectCreationAttributes,
} from '../../modules/project/project.js';
import { Task, TaskCreationAttributes } from '../../modules/task/task.js';
import {
  Position,
  PositionCreationAttributes,
} from '../../modules/position/position.js';
import { Enums } from '../../enums/Enums.js';
import { hashPassword } from '../../hooks/crypto.js';

async function seedDatabase() {
  console.log('Starting seeder...');
  const transaction = await sequelize.transaction();

  try {
    // 1. Clean existing data
    console.log('Cleaning existing data...');

    await Position.destroy({
      where: {},
      truncate: true,
      cascade: true,
      transaction,
    });
    await Department.destroy({
      where: {},
      truncate: true,
      cascade: true,
      transaction,
    });
    await Task.destroy({
      where: {},
      truncate: true,
      cascade: true,
      transaction,
    });
    await Project.destroy({
      where: {},
      truncate: true,
      cascade: true,
      transaction,
    });
    await User.destroy({
      where: {},
      truncate: true,
      cascade: true,
      transaction,
    });
    console.log('Tables cleaned.');

    const now = new Date();

    // 2. Data creation, following dependency order
    console.log('Seeding Positions...');
    const positions: PositionCreationAttributes[] = await Position.bulkCreate(
      [{ name: 'Posição Teste', hierarchical_level: 999 }],
      { transaction, returning: true },
    );
    const position = positions[0];
    if (!position.id) {
      throw new Error('Falha ao criar Posição (Positions) no seeder.');
    }

    console.log('Seeding Users...');
    const hashedPassword = await hashPassword('usertest');
    const users: UserCreationAttributes[] = await User.bulkCreate(
      [
        {
          name: 'Usuário Teste',
          email: 'userTest@teste.com',
          password: 'usertest',
          password_hash: hashedPassword,
          hiring_date: now,
          position_id: position.id,
        },
      ],
      { transaction, returning: true },
    );
    const user = users[0];
    if (!user.id) {
      throw new Error('Falha ao criar Usuário (Users) no seeder.');
    }

    console.log('Seeding Departments...');
    const departments: DepartmentCreationAttributes[] =
      await Department.bulkCreate(
        [{ name: 'Departmento Teste', manager_id: user.id }],
        { transaction, returning: true },
      );
    const department = departments[0];
    if (!department.id) {
      throw new Error('Falha ao criar Departamento (Departments) no seeder.');
    }

    console.log('Seeding Projects...');
    const projects: ProjectCreationAttributes[] = await Project.bulkCreate(
      [
        {
          name: 'Projeto Teste',
          status: Enums.Status.Pending,
          start_date: now,
          manager_id: user.id,
        },
      ],
      { transaction, returning: true },
    );
    const project = projects[0];
    if (!project.id) {
      throw new Error('Falha ao criar Projeto (Projects) no seeder.');
    }

    console.log('Seeding Tasks...');
    const tasks: TaskCreationAttributes[] = await Task.bulkCreate(
      [
        {
          name: 'Tarefa Teste',
          status: Enums.Status.Pending,
          project_id: project.id,
          creator_id: user.id,
        },
      ],
      { transaction, returning: true },
    );
    const task = tasks[0];
    if (!task.id) {
      throw new Error('Falha ao criar Tarefa (Tasks) no seeder.');
    }

    // 3. Everything ok
    await transaction.commit();
    console.log('Database seeded succesfully! 🌱');
  } catch (error) {
    await transaction.rollback();
    console.error('Error seeding database: ', error);
    process.exit();
  } finally {
    await sequelize.close();
  }
}

// Confirmation Function
function startSeederWithConfirmation() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('--- Database Seeder ---');
  console.warn(
    '\n⚠️  ATENÇÃO: Este script irá apagar TODOS os dados das tabelas [Tasks, Projects, Users] e substituí-los por dados de teste.',
  );

  rl.question('\nVocê tem certeza que deseja continuar? (y/N) ', (answer) => {
    const confirmed = answer.toLocaleLowerCase().trim();

    if (confirmed === 'y' || confirmed === 'yes') {
      console.log('Confirmação recebida. Iniciando o processo de seed...');

      rl.close();

      seedDatabase()
        .then(() => console.log('Seeder script completed.'))
        .catch((error) =>
          console.error('Seeder script execution failed: ', error),
        );
    } else {
      console.log('Operação cancelada pelo usuário.');
      rl.close();
      process.exit(0);
    }
  });
}

// function call
startSeederWithConfirmation();
