import { Router } from 'express';
import { TaskController } from './task.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import {
  createTaskSchema,
  getTasksSchema,
  taskIdSchema,
  updateTaskSchema,
} from './task.validation.js';

const router = Router();
const taskController = new TaskController();

router.post(
  '/',
  validate(createTaskSchema),
  taskController.create.bind(taskController),
);
router.get(
  '/',
  validate(getTasksSchema),
  taskController.findAll.bind(taskController),
);
router.get(
  '/:id',
  validate(taskIdSchema),
  taskController.findById.bind(taskController),
);
router.patch(
  '/:id',
  validate(updateTaskSchema),
  taskController.update.bind(taskController),
);
router.delete(
  '/:id',
  validate(taskIdSchema),
  taskController.delete.bind(taskController),
);

export default router;
