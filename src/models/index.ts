import { Sequelize } from 'sequelize';
import dbConfig from '../config/database.js';

// Import all model classes
import { User } from '../modules/user/user.js';

// Creates the Squelize instance
const environment = process.env.NODE_ENV || 'development';
const config = dbConfig[environment];
const sequelize = new Sequelize(config);

// Creates an object with all models for easy access
const models = {
  User,
};

// --- INITIALIZATION AND ASSOCIATION ---

Object.values(models).forEach((model) => {
  model.initialize(sequelize);
});

export { sequelize };
