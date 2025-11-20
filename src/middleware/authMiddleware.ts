import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';
import { type AuthUserPayload } from '../types/express.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!JWT_SECRET) {
      throw new AppError('Segredo JWT não configurado', 500);
    }

    const token = req.cookies.token;

    if (!token) {
      throw new AppError('Não autorizado. Faça o login.', 401);
    }

    const payload = jwt.verify(token, JWT_SECRET) as AuthUserPayload;

    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
};
