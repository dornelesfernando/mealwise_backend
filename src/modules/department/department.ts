import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import type { User } from '../user/user.js';

interface DepartmentAttributes {
  id: string; // UUID
  name: string;
  description?: string;
  manager_id: string; // FK UUID of the manager
  is_active: boolean;
}

type AssociationModels = {
  User: typeof User;
};

type DepartmentCreationAttributes = Optional<
  DepartmentAttributes,
  'id' | 'description' | 'is_active'
>;

class Department
  extends Model<DepartmentAttributes, DepartmentCreationAttributes>
  implements DepartmentAttributes
{
  declare id: string; // UUID
  declare name: string;
  declare description?: string;
  declare manager_id: string; // FK UUID of the manager
  declare is_active: boolean;

  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  declare readonly users?: User[];
  declare readonly manager?: User;

  // Initialization and association methods
  static initialize(sequelize: Sequelize) {
    Department.init(
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
        manager_id: {
          type: DataTypes.UUID,
          allowNull: false,
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
        tableName: 'departments',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );
  }

  // Association methods
  static associate(models: AssociationModels) {
    Department.hasMany(models.User, {
      foreignKey: 'department_id',
      as: 'users',
    });

    Department.belongsTo(models.User, {
      foreignKey: 'manager_id',
      as: 'manager',
    });
  }
}

export { Department, DepartmentAttributes, DepartmentCreationAttributes };
