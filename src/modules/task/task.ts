import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Enums, EnumPriority, EnumStatus } from '../../enums/Enums.js';

import type { Project } from '../project/project.js';
import type { User } from '../user/user.js';
import type { UserTask } from '../userTask/userTask.js';
import type { HourLog } from '../hourLog/hourLog.js';
import type { Attachment } from '../attachment/attachment.js';

interface TaskAttributes {
  id: string; // UUID
  parent_id?: string; // UUID
  name: string;
  description?: string;
  due_date?: Date;
  priority: EnumPriority;
  status: EnumStatus;
  project_id: string; // UUID of the project to which the task belongs
  creator_id: string; // UUID of the user who created the task
}

type AssociationModels = {
  Task: typeof Task;
  Project: typeof Project;
  User: typeof User;
  UserTask: typeof UserTask;
  HourLog: typeof HourLog;
  Attachment: typeof Attachment;
};

type TaskCreationAttributes = Optional<
  TaskAttributes,
  | 'id'
  | 'parent_id'
  | 'description'
  | 'due_date'
  | 'priority'
  | 'status'
  | 'project_id'
>;

class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  declare id: string;
  declare parent_id?: string;
  declare name: string;
  declare description?: string;
  declare due_date?: Date;
  declare priority: EnumPriority;
  declare status: EnumStatus;
  declare project_id: string; // UUID of the project to which the task belongs
  declare creator_id: string; // UUID of the user who created the task

  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  declare readonly parent?: Task;
  declare readonly project?: Project;
  declare readonly creator?: User;
  declare readonly attachments?: Attachment[];
  declare readonly assignedUsers?: User[];
  declare readonly hourLogs?: HourLog[];
  declare readonly userTasks?: UserTask[];

  // Initialization and association methods
  static initialize(sequelize: Sequelize) {
    Task.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        parent_id: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'tasks',
            key: 'id',
          },
        },
        name: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        due_date: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        priority: {
          type: DataTypes.ENUM(...Object.values(Enums.Priority)),
          allowNull: false,
          defaultValue: Enums.Priority.Low,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(Enums.Status)),
          allowNull: false,
          defaultValue: Enums.Status.Pending,
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'projects',
            key: 'id',
          },
        },
        creator_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'tasks',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );
  }

  // Association methods
  static associate(models: AssociationModels) {
    Task.belongsTo(models.Task, {
      foreignKey: 'parent_id',
      as: 'parent',
    });

    Task.belongsTo(models.Project, {
      foreignKey: 'project_id',
      as: 'project',
    });

    Task.belongsTo(models.User, {
      foreignKey: 'creator_id',
      as: 'creator',
    });

    Task.hasMany(models.Attachment, {
      foreignKey: 'task_id',
      as: 'attachments',
    });

    Task.hasMany(models.HourLog, {
      foreignKey: 'task_id',
      as: 'hourLogs',
    });

    Task.hasMany(models.UserTask, {
      foreignKey: 'task_id',
      as: 'userTasks',
    });

    Task.belongsToMany(models.User, {
      through: models.UserTask,
      foreignKey: 'task_id',
      otherKey: 'user_id',
      as: 'assignedUsers',
    });
  }
}

export { Task, TaskCreationAttributes, TaskAttributes };
