import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import type { User } from '../user/user.js';
import type { Role } from '../role/role.js';

interface UserRoleAttributes {
  id: string; // UUID
  user_id: string; // UUID to the user
  role_id: string; // UUID to the role
}

type AssociationModels = {
  User: typeof User;
  Role: typeof Role;
};

type UserRoleCreationAttributes = Optional<UserRoleAttributes, 'id'>;

class UserRole
  extends Model<UserRoleAttributes, UserRoleCreationAttributes>
  implements UserRoleAttributes
{
  declare id: string;
  declare user_id: string;
  declare role_id: string;

  declare readonly user?: User;
  declare readonly role?: Role;

  // Initialization and association methods
  static initialize(sequelize: Sequelize) {
    UserRole.init(
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
        role_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'user_roles',
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['user_id', 'role_id'],
          },
        ],
      },
    );
  }

  // Association methods
  static associate(models: AssociationModels) {
    UserRole.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    UserRole.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role',
    });
  }
}

export { UserRole, UserRoleAttributes, UserRoleCreationAttributes };
