import { sequelize } from '../../models/index.js';
import readline from 'readline';

import { User, UserCreationAttributes } from '../../modules/user/user.js';
import { hashPassword } from '../../hooks/crypto.js';

async function seedDatabase() {
  console.log('Starting seeder...');
  const transaction = await sequelize.transaction();

  try {
    // 1. Clean existing data
    console.log('Cleaning existing data...');
    await User.destroy({
      where: {},
      truncate: true,
      cascade: true,
      transaction,
    });
    console.log('Tables cleaned.');

    // 2. Data creation, following dependency order
    console.log('Seeding Users...');
    const hashedPassword = await hashPassword('usertest');
    const users: UserCreationAttributes[] = await User.bulkCreate(
      [
        {
          name: 'Usuário Teste',
          email: 'userTest@teste.com',
          password: 'usertest',
          password_hash: hashedPassword,
          role: 'customer',
        },
      ],
      { transaction, returning: true },
    );
    const user = users[0];
    if (!user.id) {
      throw new Error('Falha ao criar Usuário (Users) no seeder.');
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
    '\n⚠️  ATENÇÃO: Este script irá apagar TODOS os dados das tabelas [Users] e substituí-los por dados de teste.',
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
