import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import { loginSchema, registerSchema } from './auth.validation.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();
const authController = new AuthController();

router.post(
  '/login',
  validate(loginSchema),
  authController.login.bind(authController),
);

router.post(
  '/register',
  validate(registerSchema),
  authController.register.bind(authController),
);

router.post('/logout', authController.logout.bind(authController));

router.get('/me', authMiddleware, authController.getMe.bind(authController));

export default router;
