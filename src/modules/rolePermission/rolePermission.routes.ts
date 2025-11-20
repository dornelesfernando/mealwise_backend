import { Router } from 'express';
import { RolePermissionController } from './rolePermission.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import {
  createRolePermissionSchema,
  getRolePermissionsSchema,
  rolePermissionIdSchema,
  updateRolePermissionSchema,
} from './rolePermission.validation.js';

const router = Router();
const rolePermissionController = new RolePermissionController();

router.post(
  '/',
  validate(createRolePermissionSchema),
  rolePermissionController.create.bind(rolePermissionController),
);
router.get(
  '/',
  validate(getRolePermissionsSchema),
  rolePermissionController.findAll.bind(rolePermissionController),
);
router.get(
  '/:id',
  validate(rolePermissionIdSchema),
  rolePermissionController.findById.bind(rolePermissionController),
);
router.patch(
  '/:id',
  validate(updateRolePermissionSchema),
  rolePermissionController.update.bind(rolePermissionController),
);
router.delete(
  '/:id',
  validate(rolePermissionIdSchema),
  rolePermissionController.delete.bind(rolePermissionController),
);

export default router;
