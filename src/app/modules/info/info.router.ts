import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { InfoController } from './info.controller';
import { InfoValidation } from './info.validation';
const router = express.Router();

router.get('/', InfoController.getAllInfo);
router.get('/:id', InfoController.getSingleInfo);

router.post(
  '/',
  validateRequest(InfoValidation.createValidation),
  InfoController.createInfo
);

router.patch(
  '/:id',
  validateRequest(InfoValidation.updateValidation),
  InfoController.updateInfo
);
router.delete('/', InfoController.deleteInfo);

export const InfoRoutes = router;
