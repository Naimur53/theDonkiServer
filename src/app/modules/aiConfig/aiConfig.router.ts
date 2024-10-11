import express from 'express';
import auth from '../../middlewares/auth';
import uploadPdfFile from '../../middlewares/uploadPdf';
import validateRequest from '../../middlewares/validateRequest';
import { AiConfigController } from './aiConfig.controller';
import { AiConfigValidation } from './aiConfig.validation';
const router = express.Router();

router.get('/', AiConfigController.getAllAiConfig);
router.post(
  '/asked',
  // validateRequest(AiConfigValidation.askedValidation),
  // verifyRecaptcha,
  uploadPdfFile,
  AiConfigController.askedQuestion
);
router.post(
  '/increase-untruthful-count',
  AiConfigController.increaseTruthfulCount
);

router.post(
  '/',
  auth(),
  validateRequest(AiConfigValidation.createValidation),
  AiConfigController.createAiConfig
);

router.patch(
  '/',
  auth(),
  validateRequest(AiConfigValidation.updateValidation),
  AiConfigController.updateAiConfig
);
router.delete('/', auth(), AiConfigController.deleteAiConfig);

export const AiConfigRoutes = router;
