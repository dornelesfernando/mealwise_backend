import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import type { User } from '../user/user.js';
import type { Task } from '../task/task.js';

interface UserTaskAttributes {
  id: string; // UUID
  user_id: string; // UUID to reference the user
  task_id: string; // UUID to reference the task
  assignment_date: Date;
  is_main_responsible: boolean;
}

type AssociationModels = {
  User: typeof User;
  Task: typeof Task;
};

type UserTaskCreationAttributes = Optional<
  UserTaskAttributes,
  'id' | 'assignment_date' | 'is_main_responsible'
>;

class UserTask
  extends Model<UserTaskAttributes, UserTaskCreationAttributes>
  implements UserTaskAttributes
{
  declare id: string;
  declare user_id: string; // UUID to reference the user
  declare task_id: string; // UUID to reference the task
  declare assignment_date: Date;
  declare is_main_responsible: boolean;

  declare readonly user?: User;
  declare readonly task?: Task;

  // Initialization and association methods
  static initialize(sequelize: Sequelize) {
    UserTask.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        task_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'tasks',
            key: 'id',
          },
        },
        assignment_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        is_main_responsible: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: 'user_tasks',
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['user_id', 'task_id'],
          },
        ],
      },
    );
  }

  // Association methods
  static associate(models: AssociationModels) {
    UserTask.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    UserTask.belongsTo(models.Task, {
      foreignKey: 'task_id',
      as: 'task',
    });
  }
}

export { UserTask, UserTaskAttributes, UserTaskCreationAttributes };
