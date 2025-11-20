import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import type { User } from '../user/user.js';

interface PositionAttributes {
  id: string; // UUID
  name: string;
  description?: string;
  hierarchical_level: number;
}

type AssociationModels = {
  User: typeof User;
};

type PositionCreationAttributes = Optional<
  PositionAttributes,
  'id' | 'description'
>;

class Position
  extends Model<PositionAttributes, PositionCreationAttributes>
  implements PositionAttributes
{
  declare id: string;
  declare name: string;
  declare description?: string;
  declare hierarchical_level: number;

  declare readonly users?: User[];

  // Initialization and association methods
  static initialize(sequelize: Sequelize) {
    Position.init(
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
        hierarchical_level: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'positions',
        timestamps: false,
      },
    );
  }

  // Association methods
  static associate(models: AssociationModels) {
    Position.hasMany(models.User, {
      foreignKey: 'position_id',
      as: 'users',
    });
  }
}

export { Position, PositionAttributes, PositionCreationAttributes };
