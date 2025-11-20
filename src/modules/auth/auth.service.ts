import bcrypt from 'bcryptjs';
import { AppError } from '../../utils/AppError.js';
import { User } from '../user/user.js';
import jwt from 'jsonwebtoken';
import { CreateUserDTO, SafeUserDTO } from '../user/user.dtos.js';
import { LoginDTO } from './auth.dtos.js';
import { sequelize } from '../../models/index.js';
import { Position } from '../position/position.js';
import { Department } from '../department/department.js';
import { hashPassword } from '../../hooks/crypto.js';

export class AuthService {
  public async login(
    loginData: LoginDTO,
  ): Promise<{ token: string; safeUser: SafeUserDTO }> {
    try {
      const { email, password } = loginData;

      // Search user
      const user = await User.findOne({
        where: { email },
        attributes: { include: ['password_hash'] },
      });
      if (!user) {
        throw new AppError('Email ou senha inválidos', 401);
      }
      // Compare password
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash,
      );
      if (!isPasswordValid) {
        throw new AppError('Email ou senha inválidos', 401);
      }

      if (!user.is_active) {
        throw new AppError('Usuário inativo. Contate o administrador.', 403);
      }

      // Generate token
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new AppError('Segredo JWT não configurado', 500);
      }

      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.roles,
      };

      const token = jwt.sign(tokenPayload, secret, { expiresIn: '1d' });

      user.password_hash = '';
      const {
        password_hash: _unused_hash,
        password: _unused_pass,
        ...safeUser
      } = user.toJSON();

      return { token, safeUser };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao fazer login: ', error);
      throw new AppError(
        'Não foi possível fazer login devido a um erro interno.',
        500,
      );
    }
  }

  public async register(registerData: CreateUserDTO): Promise<SafeUserDTO> {
    try {
      const { position_id, department_id, supervisor_id } = registerData;
      const { password, ...rest } = registerData;

      const newUser = await sequelize.transaction(async (t) => {
        const existingUser = await User.findOne({
          where: { email: registerData.email },
          transaction: t,
        });

        if (existingUser) {
          throw new AppError(
            'Já existe um usuário cadastrado com este e-mail.',
            409,
          );
        }

        const positionExists = await Position.findByPk(position_id);

        if (!positionExists) {
          throw new AppError('Posição não encontrada.', 404);
        }

        if (department_id) {
          const departmentExists = await Department.findByPk(department_id);

          if (!departmentExists) {
            throw new AppError('Departamento não encontrado.', 404);
          }
        }

        if (supervisor_id) {
          const supervisorExists = await User.findByPk(supervisor_id);

          if (!supervisorExists) {
            throw new AppError('Supervisor não encontrado.', 404);
          }
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create(
          {
            ...rest,
            password_hash: hashedPassword,
            password: '',
          },
          {
            transaction: t,
          },
        );

        return user;
      });

      const {
        password_hash: _unused_hash,
        password: _unused_pass,
        ...safeUser
      } = newUser.toJSON();
      return safeUser as SafeUserDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao criar usuário: ', error);
      throw new AppError(
        'Não foi possível criar o usuário devido a um erro interno.',
        500,
      );
    }
  }

  public async getMe(userId: string): Promise<SafeUserDTO> {
    try {
      const user = await User.findByPk(userId, {
        attributes: {
          exclude: ['password_hash', 'password'],
        },
      });

      if (!user) {
        throw new AppError('Usuário não encontrado.', 404);
      }

      return user as SafeUserDTO;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error('Erro ao buscar usuário: ', error);
      throw new AppError(
        'Não foi possível buscar o usuário devido a um erro interno.',
        500,
      );
    }
  }
}
