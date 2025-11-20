import { Router } from 'express';
import { ProjectController } from './project.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import {
  createProjectSchema,
  getProjectsSchema,
  projectIdSchema,
  updateProjectSchema,
} from './project.validation.js';

const router = Router();
const projectController = new ProjectController();

router.post(
  '/',
  validate(createProjectSchema),
  projectController.create.bind(projectController),
);
router.get(
  '/',
  validate(getProjectsSchema),
  projectController.findAll.bind(projectController),
);
router.get(
  '/:id',
  validate(projectIdSchema),
  projectController.findById.bind(projectController),
);
router.patch(
  '/:id',
  validate(updateProjectSchema),
  projectController.update.bind(projectController),
);
router.delete(
  '/:id',
  validate(projectIdSchema),
  projectController.delete.bind(projectController),
);

export default router;
