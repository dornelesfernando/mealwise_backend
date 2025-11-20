import { Router } from 'express';
import { AttachmentController } from './attachment.controller.js';
import { validate } from '../../middleware/validateMiddleware.js';
import {
  createAttachmentSchema,
  getAttachmentsSchema,
  attachmentIdSchema,
  updateAttachmentSchema,
} from './attachment.validation.js';

const router = Router();
const attachmentController = new AttachmentController();

router.post(
  '/',
  validate(createAttachmentSchema),
  attachmentController.create.bind(attachmentController),
);
router.get(
  '/',
  validate(getAttachmentsSchema),
  attachmentController.findAll.bind(attachmentController),
);
router.get(
  '/:id',
  validate(attachmentIdSchema),
  attachmentController.findById.bind(attachmentController),
);
router.patch(
  '/:id',
  validate(updateAttachmentSchema),
  attachmentController.update.bind(attachmentController),
);
router.delete(
  '/:id',
  validate(attachmentIdSchema),
  attachmentController.delete.bind(attachmentController),
);

export default router;
