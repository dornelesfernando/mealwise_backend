import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import type { Role } from '../role/role.js';
import type { Permission } from '../permission/permission.js';

interface RolePermissionAttributes {
  id: string; // UUID
  role_id: string; // UUID referencing roles table
  permission_id: string; // UUID referencing permissions table
}

type AssociationModels = {
  Role: typeof Role;
  Permission: typeof Permission;
};

type RolePermissionCreationAttributes = Optional<
  RolePermissionAttributes,
  'id'
>;

class RolePermission
  extends Model<RolePermissionAttributes, RolePermissionCreationAttributes>
  implements RolePermissionAttributes
{
  declare id: string;
  declare role_id: string;
  declare permission_id: string;

  declare readonly role?: Role;
  declare readonly permission?: Permission;

  // Initialization and association methods
  static initialize(sequelize: Sequelize) {
    RolePermission.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        role_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id',
          },
        },
        permission_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'permissions',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'role_permissions',
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['role_id', 'permission_id'],
          },
        ],
      },
    );
  }

  // Association methods
  static associate(models: AssociationModels) {
    RolePermission.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role',
    });
    RolePermission.belongsTo(models.Permission, {
      foreignKey: 'permission_id',
      as: 'permission',
    });
  }
}

export {
  RolePermission,
  RolePermissionAttributes,
  RolePermissionCreationAttributes,
};
