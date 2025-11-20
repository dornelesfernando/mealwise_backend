import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
import type { Position } from '../position/position.js';
import type { Department } from '../department/department.js';
import type { Role } from '../role/role.js';
import type { UserRole } from '../userRole/userRole.js';
import { Project } from '../project/project.js';
import { Task } from '../task/task.js';
import { HourLog } from '../hourLog/hourLog.js';
import { Attachment } from '../attachment/attachment.js';
import { UserTask } from '../userTask/userTask.js';

interface UserAttributes {
  id: string; // UUID
  name: string;
  email: string;
  password?: string;
  password_hash: string;
  cellphone?: string;
  hiring_date: Date;
  birth_date?: Date;
  address?: string;
  position_id: string; // FK Position (UUID)
  department_id?: string; // FK Department (UUID)
  supervisor_id?: string; // FK User (UUID)
  is_active: boolean;
}

type AssociationModels = {
  User: typeof User;
  Position: typeof Position;
  Department: typeof Department;
  Role: typeof Role;
  UserRole: typeof UserRole;
  Project: typeof Project;
  Task: typeof Task;
  HourLog: typeof HourLog;
  Attachment: typeof Attachment;
  UserTask: typeof UserTask;
};

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | 'id'
    | 'password_hash'
    | 'cellphone'
    | 'birth_date'
    | 'address'
    | 'department_id'
    | 'supervisor_id'
    | 'is_active'
  > {
  password: string;
}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: string;
  declare name: string;
  declare email: string;
  declare password: string;
  declare password_hash: string;
  declare cellphone?: string;
  declare hiring_date: Date;
  declare birth_date?: Date;
  declare address?: string;
  declare position_id: string;
  declare department_id?: string;
  declare supervisor_id?: string;
  declare is_active: boolean;

  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  declare readonly position?: Position;
  declare readonly department?: Department;
  declare readonly supervisor?: User;
  declare readonly subordinates?: User[];
  declare readonly managedProjects?: Project[];
  declare readonly createdTasks?: Task[];
  declare readonly userTasks?: UserTask[];
  declare readonly hourLogs?: HourLog[];
  declare readonly approvedHourLogs?: HourLog[];
  declare readonly createdAttachments?: Attachment[];
  declare readonly profileAttachments?: Attachment[];
  declare readonly roles?: Role[];
  declare readonly userRoles?: UserRole[];
  declare readonly managedDepartment?: Department;

  // Instance methods
  public async comparePassword(enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password_hash);
  }

  // Initialization and association methods
  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.VIRTUAL,
        },
        password_hash: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        cellphone: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        hiring_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        birth_date: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        position_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'positions',
            key: 'id',
          },
        },
        department_id: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'departments',
            key: 'id',
          },
        },
        supervisor_id: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',

        defaultScope: {
          attributes: {
            exclude: ['password_hash', 'password'],
          },
        },
      },
    );
  }

  // Association methods
  static associate(models: AssociationModels) {
    User.belongsTo(models.Position, {
      foreignKey: 'position_id',
      as: 'position',
    });

    User.belongsTo(models.Department, {
      foreignKey: 'department_id',
      as: 'department',
    });

    User.belongsTo(models.User, {
      foreignKey: 'supervisor_id',
      as: 'supervisor',
    });

    User.hasMany(models.User, {
      foreignKey: 'supervisor_id',
      as: 'subordinates',
    });

    User.hasMany(models.Project, {
      foreignKey: 'manager_id',
      as: 'managedProjects',
    });

    User.hasMany(models.Task, {
      foreignKey: 'creator_id',
      as: 'createdTasks',
    });

    User.hasMany(models.UserTask, {
      foreignKey: 'user_id',
      as: 'userTasks',
    });

    User.hasMany(models.HourLog, {
      foreignKey: 'user_id',
      as: 'hourLogs',
    });

    User.hasMany(models.HourLog, {
      foreignKey: 'approver_id',
      as: 'approvedHourLogs',
    });

    User.hasMany(models.Attachment, {
      foreignKey: 'creator_id',
      as: 'createdAttachments',
    });

    User.hasMany(models.Attachment, {
      foreignKey: 'user_profile_id',
      as: 'profileAttachments',
    });

    User.belongsToMany(models.Role, {
      through: models.UserRole,
      foreignKey: 'user_id',
      otherKey: 'role_id',
      as: 'roles',
    });

    User.hasMany(models.UserRole, {
      foreignKey: 'user_id',
      as: 'userRoles',
    });

    User.hasOne(models.Department, {
      foreignKey: 'manager_id',
      as: 'managedDepartment',
    });
  }
}

export { User, UserCreationAttributes, UserAttributes };
