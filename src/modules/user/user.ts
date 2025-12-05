import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

interface UserAttributes {
  id: string; // UUID
  name: string;
  email: string;
  password?: string;
  password_hash: string;
  phone?: string;

  role: 'customer' | 'establishment' | 'deliveryman';

  city?: string;
  address?: string;

  cpf?: string;
  cnpj?: string;
  birthdate?: Date | string;
  university?: string;

  is_active: boolean;

  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    'id' | 'is_active' | 'created_at' | 'updated_at'
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
  declare phone?: string;

  declare role: 'customer' | 'establishment' | 'deliveryman';

  declare city?: string;
  declare address?: string;

  declare cpf?: string;
  declare cnpj?: string;
  declare birthdate?: Date | string;
  declare university?: string;

  declare is_active: boolean;

  declare readonly created_at: Date;
  declare readonly updated_at: Date;

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
        phone: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        role: {
          defaultValue: 'customer',
          type: DataTypes.ENUM('customer', 'establishment', 'deliveryman'),
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        cpf: {
          type: DataTypes.STRING(14),
          allowNull: true,
          unique: true,
        },
        cnpj: {
          type: DataTypes.STRING(18),
          allowNull: true,
          unique: true,
        },
        birthdate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        university: {
          type: DataTypes.STRING(100),
          allowNull: true,
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
}

export { User, UserCreationAttributes, UserAttributes };
