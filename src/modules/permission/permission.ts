import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import type { RolePermission } from '../rolePermission/rolePermission.js';
import type { Role } from '../role/role.js';

interface PermissionAttributes {
  id: string; // UUID
  name: string;
  description?: string;
}

type AssociationModels = {
  RolePermission: typeof RolePermission;
  Role: typeof Role;
};

type PermissionCreationAttributes = Optional<
  PermissionAttributes,
  'id' | 'description'
>;

class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  declare id: string;
  declare name: string;
  declare description?: string;

  declare readonly rolePermissions?: RolePermission[];
  declare readonly roles?: Role[];

  // Initialization and association methods
  static initialize(sequelize: Sequelize) {
    Permission.init(
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
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'permissions',
        timestamps: false,
      },
    );
  }

  // Association methods
  static associate(models: AssociationModels) {
    Permission.hasMany(models.RolePermission, {
      foreignKey: 'permission_id',
      as: 'rolePermissions',
    });

    Permission.belongsToMany(models.Role, {
      through: models.RolePermission,
      foreignKey: 'permission_id',
      otherKey: 'role_id',
      as: 'roles',
    });
  }
}

export { Permission, PermissionAttributes, PermissionCreationAttributes };
