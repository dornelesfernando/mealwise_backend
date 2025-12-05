import { Router } from 'express';
import userRoutes from '../modules/user/user.routes.js';
import authRoutes from '../modules/auth/auth.routes.js';

const mainRouter = Router();

// Models
mainRouter.use('/users', userRoutes);

mainRouter.use('/auth', authRoutes);

export default mainRouter;
