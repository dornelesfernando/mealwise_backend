import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import type { User } from '../user/user.js';
import type { Task } from '../task/task.js';
import type { Project } from '../project/project.js';

interface AttachmentAttributes {
  id: string; // UUID
  file_name: string;
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  creator_id: string; // UUID of the user
  task_id?: string; // UUID of the task
  project_id?: string; // UUID of the project
}

type AssociationModels = {
  User: typeof User;
  Task: typeof Task;
  Project: typeof Project;
};

type AttachmentCreationAttributes = Optional<
  AttachmentAttributes,
  'id' | 'task_id' | 'project_id'
>;

class Attachment
  extends Model<AttachmentAttributes, AttachmentCreationAttributes>
  implements AttachmentAttributes
{
  declare id: string;
  declare file_name: string;
  declare storage_path: string;
  declare mime_type: string;
  declare size_bytes: number;
  declare creator_id: string;
  declare task_id?: string;
  declare project_id?: string;

  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  declare readonly creator?: User;
  declare readonly task?: Task;
  declare readonly project?: Project;

  // Initialization and association methods
  static initialize(sequelize: Sequelize) {
    Attachment.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        file_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        storage_path: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        mime_type: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        size_bytes: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        creator_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        task_id: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'tasks',
            key: 'id',
          },
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'projects',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'attachments',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );
  }

  // Association methods
  static associate(models: AssociationModels) {
    Attachment.belongsTo(models.User, {
      foreignKey: 'creator_id',
      as: 'creator',
    });

    Attachment.belongsTo(models.Task, {
      foreignKey: 'task_id',
      as: 'task',
    });

    Attachment.belongsTo(models.Project, {
      foreignKey: 'project_id',
      as: 'project',
    });
  }
}

export { Attachment, AttachmentAttributes, AttachmentCreationAttributes };
