import { Router } from 'express';
import { UserController } from './user.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import {
  createUserSchema,
  getUsersSchema,
  userIdSchema,
  updateUserSchema,
} from './user.validation.js';

const router = Router();
const userController = new UserController();

router.post(
  '/',
  validate(createUserSchema),
  userController.create.bind(userController),
);
router.get(
  '/',
  validate(getUsersSchema),
  userController.findAll.bind(userController),
);
router.get(
  '/:id',
  validate(userIdSchema),
  userController.findById.bind(userController),
);
router.patch(
  '/:id',
  validate(updateUserSchema),
  userController.update.bind(userController),
);
router.delete(
  '/:id',
  validate(userIdSchema),
  userController.delete.bind(userController),
);

export default router;
