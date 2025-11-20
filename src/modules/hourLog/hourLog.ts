import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Enums, EnumApprovalStatus } from '../../enums/Enums.js';
import type { Task } from '../task/task.js';
import type { User } from '../user/user.js';

interface HourLogAttributes {
  id: string; // UUID
  task_id: string; // UUID of the task
  user_id: string; // UUID of the user who logged the hours
  log_date: Date;
  start_time: string;
  end_time?: string;
  hours_worked?: number;
  description?: string;
  approval_status: EnumApprovalStatus;
  approver_id?: string; // UUID of the user, may be null
  approval_date?: Date;
}

type AssociationModels = {
  User: typeof User;
  Task: typeof Task;
};

type HourLogCreationAttributes = Optional<
  HourLogAttributes,
  | 'id'
  | 'description'
  | 'end_time'
  | 'approval_status'
  | 'approver_id'
  | 'approval_date'
>;

class HourLog
  extends Model<HourLogAttributes, HourLogCreationAttributes>
  implements HourLogAttributes
{
  declare id: string;
  declare task_id: string;
  declare user_id: string;
  declare log_date: Date;
  declare start_time: string;
  declare end_time?: string;
  declare hours_worked?: number;
  declare description?: string;
  declare approval_status: EnumApprovalStatus;
  declare approver_id?: string;
  declare approval_date?: Date;

  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  declare readonly task?: Task;
  declare readonly user?: User;
  declare readonly approver?: User;

  // Initialization and association methods
  static initialize(sequelize: Sequelize) {
    HourLog.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        task_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'tasks',
            key: 'id',
          },
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        log_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        start_time: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        end_time: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        hours_worked: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        approval_status: {
          type: DataTypes.ENUM(...Object.values(Enums.ApprovalStatus)),
          allowNull: false,
          defaultValue: Enums.ApprovalStatus.Pending,
        },
        approver_id: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        approval_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'hour_logs',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );
  }

  // Association methods
  static associate(models: AssociationModels) {
    HourLog.belongsTo(models.User, {
      foreignKey: 'task_id',
      as: 'task',
    });

    HourLog.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    HourLog.belongsTo(models.Task, {
      foreignKey: 'approver_id',
      as: 'approver',
    });
  }
}

export { HourLog, HourLogAttributes, HourLogCreationAttributes };
