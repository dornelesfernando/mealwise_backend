import { sequelize } from '../../models/index.js';

async function runMigrations() {
  try {
    console.log('Starting database synchronization...');

    await sequelize.sync({ alter: true });

    console.log('Database synced successfully. All tables created/updated.');
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

runMigrations()
  .then(() => console.log('Migration script completed.'))
  .catch((error) => console.log('Migration script execution failed:', error));
