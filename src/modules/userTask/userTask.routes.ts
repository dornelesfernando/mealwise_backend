import { Router } from 'express';
import { UserTaskController } from './userTask.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import {
  createUserTaskSchema,
  getUserTasksSchema,
  userTaskIdSchema,
  updateUserTaskSchema,
} from './userTask.validation.js';

const router = Router();
const userTaskController = new UserTaskController();

router.post(
  '/',
  validate(createUserTaskSchema),
  userTaskController.create.bind(userTaskController),
);
router.get(
  '/',
  validate(getUserTasksSchema),
  userTaskController.findAll.bind(userTaskController),
);
router.get(
  '/:id',
  validate(userTaskIdSchema),
  userTaskController.findById.bind(userTaskController),
);
router.patch(
  '/:id',
  validate(updateUserTaskSchema),
  userTaskController.update.bind(userTaskController),
);
router.delete(
  '/:id',
  validate(userTaskIdSchema),
  userTaskController.delete.bind(userTaskController),
);

export default router;
