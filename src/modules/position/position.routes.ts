import { Router } from 'express';
import { PositionController } from './position.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import {
  createPositionSchema,
  getPositionsSchema,
  positionIdSchema,
  updatePositionSchema,
} from './position.validation.js';

const router = Router();
const positionController = new PositionController();

router.post(
  '/',
  validate(createPositionSchema),
  positionController.create.bind(positionController),
);
router.get(
  '/',
  validate(getPositionsSchema),
  positionController.findAll.bind(positionController),
);
router.get(
  '/:id',
  validate(positionIdSchema),
  positionController.findById.bind(positionController),
);
router.patch(
  '/:id',
  validate(updatePositionSchema),
  positionController.update.bind(positionController),
);
router.delete(
  '/:id',
  validate(positionIdSchema),
  positionController.delete.bind(positionController),
);

export default router;
