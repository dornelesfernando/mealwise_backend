import { Sequelize } from 'sequelize';
import dbConfig from '../config/database.js';

// Import all model classes
import { Attachment } from '../modules/attachment/attachment.js';
import { Department } from '../modules/department/department.js';
import { User } from '../modules/user/user.js';
import { UserRole } from '../modules/userRole/userRole.js';
import { UserTask } from '../modules/userTask/userTask.js';
import { HourLog } from '../modules/hourLog/hourLog.js';
import { Permission } from '../modules/permission/permission.js';
import { Position } from '../modules/position/position.js';
import { Project } from '../modules/project/project.js';
import { Role } from '../modules/role/role.js';
import { RolePermission } from '../modules/rolePermission/rolePermission.js';
import { Task } from '../modules/task/task.js';

// Creates the Squelize instance
const environment = process.env.NODE_ENV || 'development';
const config = dbConfig[environment];
const sequelize = new Sequelize(config);

// Creates an object with all models for easy access
const models = {
  Attachment,
  Department,
  User,
  UserRole,
  UserTask,
  HourLog,
  Permission,
  Position,
  Project,
  Role,
  RolePermission,
  Task,
};

// --- INITIALIZATION AND ASSOCIATION ---

Object.values(models).forEach((model) => {
  model.initialize(sequelize);
});

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
