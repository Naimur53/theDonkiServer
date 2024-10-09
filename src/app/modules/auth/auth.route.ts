import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import verifyRecaptcha from '../../middlewares/verifyRecaptch';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();
router.post(
  '/signin',
  verifyRecaptcha,
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  '/captcha-validation',
  validateRequest(AuthValidation.captchaZodSchema),
  AuthController.captchaValidator
);

export const AuthRoutes = router;
