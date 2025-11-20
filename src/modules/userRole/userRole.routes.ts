import { Router } from 'express';
import { UserRoleController } from './userRole.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import {
  createUserRoleSchema,
  getUserRolesSchema,
  userRoleIdSchema,
  updateUserRoleSchema,
} from './userRole.validation.js';

const router = Router();
const userRoleController = new UserRoleController();

router.post(
  '/',
  validate(createUserRoleSchema),
  userRoleController.create.bind(userRoleController),
);
router.get(
  '/',
  validate(getUserRolesSchema),
  userRoleController.findAll.bind(userRoleController),
);
router.get(
  '/:id',
  validate(userRoleIdSchema),
  userRoleController.findById.bind(userRoleController),
);
router.patch(
  '/:id',
  validate(updateUserRoleSchema),
  userRoleController.update.bind(userRoleController),
);
router.delete(
  '/:id',
  validate(userRoleIdSchema),
  userRoleController.delete.bind(userRoleController),
);

export default router;
