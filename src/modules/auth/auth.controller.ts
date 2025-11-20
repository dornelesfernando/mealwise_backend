import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDTO } from './auth.dtos.js';
import { CreateUserDTO, SafeUserDTO } from '../user/user.dtos.js';

const authService = new AuthService();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as 'strict',
  path: '/',
  maxAge: 1000 * 60 * 60 * 24 * 1,
};

export class AuthController {
  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { email, password }: LoginDTO = req.body;

    try {
      const { token, safeUser } = await authService.login({ email, password });

      res.cookie('token', token, { ...cookieOptions });
      res.status(200).json({ success: true, safeUser });
    } catch (error) {
      next(error);
    }
  }

  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const registerData: CreateUserDTO = req.body;

      const newUser: SafeUserDTO = await authService.register(registerData);
      res.status(201).json({ success: true, data: newUser });
    } catch (error: unknown) {
      next(error);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const user: SafeUserDTO = await authService.getMe(id);
      res.status(200).json({ success: true, data: user });
    } catch (error: unknown) {
      next(error);
    }
  }

  public logout(req: Request, res: Response, next: NextFunction): void {
    try {
      res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
      });
      res.status(200).json({ success: true, message: 'Logout bem-sucedido' });
    } catch (error) {
      next(error);
    }
  }

  public async getMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user!.id;

      const user: SafeUserDTO = await authService.getMe(userId);
      res.status(200).json({ success: true, data: user });
    } catch (error: unknown) {
      next(error);
    }
  }
}
