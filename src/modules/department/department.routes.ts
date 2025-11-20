import { Router } from 'express';
import { DepartmentController } from './department.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import {
  createDepartmentSchema,
  getDepartmentsSchema,
  departmentIdSchema,
  updateDepartmentSchema,
} from './department.validation.js';

const router = Router();
const departmentController = new DepartmentController();

router.post(
  '/',
  validate(createDepartmentSchema),
  departmentController.create.bind(departmentController),
);
router.get(
  '/',
  validate(getDepartmentsSchema),
  departmentController.findAll.bind(departmentController),
);
router.get(
  '/:id',
  validate(departmentIdSchema),
  departmentController.findById.bind(departmentController),
);
router.patch(
  '/:id',
  validate(updateDepartmentSchema),
  departmentController.update.bind(departmentController),
);
router.delete(
  '/:id',
  validate(departmentIdSchema),
  departmentController.delete.bind(departmentController),
);

export default router;
