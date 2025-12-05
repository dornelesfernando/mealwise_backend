import bcrypt from 'bcryptjs';
import { AppError } from '../../utils/AppError.js';
import { User } from '../user/user.js';
import jwt from 'jsonwebtoken';
import { CreateUserDTO, SafeUserDTO } from '../user/user.dtos.js';
import { LoginDTO } from './auth.dtos.js';
import { UserService } from '../user/user.service.js';

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

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
      const newUser = await this.userService.create(registerData);

      return newUser as SafeUserDTO;
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
