import { Router } from 'express';
import { PermissionController } from './permission.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import {
  createPermissionSchema,
  getPermissionsSchema,
  permissionIdSchema,
  updatePermissionSchema,
} from './permission.validation.js';

const router = Router();
const permissionController = new PermissionController();

router.post(
  '/',
  validate(createPermissionSchema),
  permissionController.create.bind(permissionController),
);
router.get(
  '/',
  validate(getPermissionsSchema),
  permissionController.findAll.bind(permissionController),
);
router.get(
  '/:id',
  validate(permissionIdSchema),
  permissionController.findById.bind(permissionController),
);
router.patch(
  '/:id',
  validate(updatePermissionSchema),
  permissionController.update.bind(permissionController),
);
router.delete(
  '/:id',
  validate(permissionIdSchema),
  permissionController.delete.bind(permissionController),
);

export default router;
