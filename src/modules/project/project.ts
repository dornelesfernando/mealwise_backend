import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { EnumPriority, Enums, EnumStatus } from '../../enums/Enums.js';
import type { User } from '../user/user.js';
import type { Task } from '../task/task.js';
import type { Attachment } from '../attachment/attachment.js';

interface ProjectAttributes {
  id: string; // UUID
  parent_id?: string; // UUID
  name: string;
  description?: string;
  start_date: Date;
  expected_end_date?: Date;
  priority: EnumPriority;
  status: EnumStatus;
  manager_id: string; // UUID of the user who is the manager of the project
}

type AssociationModels = {
  Project: typeof Project;
  User: typeof User;
  Task: typeof Task;
  Attachment: typeof Attachment;
};

type ProjectCreationAttributes = Optional<
  ProjectAttributes,
  'id' | 'description' | 'priority' | 'expected_end_date'
>;

class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  declare id: string;
  declare parent_id?: string;
  declare name: string;
  declare description?: string;
  declare start_date: Date;
  declare expected_end_date?: Date;
  declare priority: EnumPriority;
  declare status: EnumStatus;
  declare manager_id: string;

  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  declare readonly parent?: Project;
  declare readonly manager?: User;
  declare readonly tasks?: Task[];
  declare readonly attachments?: Attachment[];

  // Initialization and association methods
  static initialize(sequelize: Sequelize) {
    Project.init(
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
            model: 'projects',
            key: 'id',
          },
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        start_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        expected_end_date: {
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
        manager_id: {
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
        tableName: 'projects',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );
  }

  // Association methods
  static associate(models: AssociationModels) {
    Project.belongsTo(models.Project, {
      foreignKey: 'parent_id',
      as: 'parent',
    });

    Project.belongsTo(models.User, {
      foreignKey: 'manager_id',
      as: 'manager',
    });

    Project.hasMany(models.Task, {
      foreignKey: 'project_id',
      as: 'tasks',
    });

    Project.hasMany(models.Attachment, {
      foreignKey: 'project_id',
      as: 'attachments',
    });
  }
}

export { Project, ProjectAttributes, ProjectCreationAttributes };
