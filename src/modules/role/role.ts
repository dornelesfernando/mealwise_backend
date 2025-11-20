import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import type { User } from '../user/user.js';
import type { Permission } from '../permission/permission.js';
import type { UserRole } from '../userRole/userRole.js';
import type { RolePermission } from '../rolePermission/rolePermission.js';

interface RoleAttributes {
  id: string; // UUID
  name: string;
  description?: string;
}

type AssociationModels = {
  User: typeof User;
  Permission: typeof Permission;
  UserRole: typeof UserRole;
  RolePermission: typeof RolePermission;
};

type RoleCreationAttributes = Optional<RoleAttributes, 'id' | 'description'>;

class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  declare id: string;
  declare name: string;
  declare description?: string;

  declare readonly userRoles?: UserRole[];
  declare readonly rolePermissions?: RolePermission[];
  declare readonly users?: User[];
  declare readonly permissions?: Permission[];

  // Initialization and association methods
  static initialize(sequelize: Sequelize) {
    Role.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'roles',
        timestamps: false,
      },
    );
  }

  // Association methods
  static associate(models: AssociationModels) {
    Role.hasMany(models.UserRole, {
      foreignKey: 'role_id',
      as: 'userRoles',
    });
    Role.hasMany(models.RolePermission, {
      foreignKey: 'role_id',
      as: 'rolePermissions',
    });

    Role.belongsToMany(models.User, {
      through: models.UserRole,
      foreignKey: 'role_id',
      otherKey: 'user_id',
      as: 'users',
    });

    Role.belongsToMany(models.Permission, {
      through: models.RolePermission,
      foreignKey: 'role_id',
      otherKey: 'permission_id',
      as: 'permissions',
    });
  }
}

export { Role, RoleAttributes, RoleCreationAttributes };
