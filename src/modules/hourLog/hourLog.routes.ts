import { Router } from 'express';
import { HourLogController } from './hourLog.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import {
  createHourLogSchema,
  getHourLogSchema,
  hourLogIdSchema,
  updateHourLogSchema,
} from './hourLog.validation.js';

const router = Router();
const hourLogController = new HourLogController();

router.post(
  '/',
  validate(createHourLogSchema),
  hourLogController.create.bind(hourLogController),
);
router.get(
  '/',
  validate(getHourLogSchema),
  hourLogController.findAll.bind(hourLogController),
);
router.get(
  '/:id',
  validate(hourLogIdSchema),
  hourLogController.findById.bind(hourLogController),
);
router.patch(
  '/:id',
  validate(updateHourLogSchema),
  hourLogController.update.bind(hourLogController),
);
router.delete(
  '/:id',
  validate(hourLogIdSchema),
  hourLogController.delete.bind(hourLogController),
);

export default router;
