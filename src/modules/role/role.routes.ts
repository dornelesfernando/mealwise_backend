import { Router } from 'express';
import { RoleController } from './role.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import {
  createRoleSchema,
  getRolesSchema,
  roleIdSchema,
  updateRoleSchema,
} from './role.validation.js';

const router = Router();
const roleController = new RoleController();

router.post(
  '/',
  validate(createRoleSchema),
  roleController.create.bind(roleController),
);
router.get(
  '/',
  validate(getRolesSchema),
  roleController.findAll.bind(roleController),
);
router.get(
  '/:id',
  validate(roleIdSchema),
  roleController.findById.bind(roleController),
);
router.patch(
  '/:id',
  validate(updateRoleSchema),
  roleController.update.bind(roleController),
);
router.delete(
  '/:id',
  validate(roleIdSchema),
  roleController.delete.bind(roleController),
);

export default router;
