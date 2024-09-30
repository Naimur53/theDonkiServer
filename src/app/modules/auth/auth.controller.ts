import { Request, Response } from 'express';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginResponse, RecaptchaResponse } from './auth.Interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = req.body;
  const result = await AuthService.loginUser(loginInfo);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', result.accessToken, cookieOptions);

  sendResponse<ILoginResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged successfully !',
    data: {
      accessToken: result.accessToken,
    },
  });
});

const captchaValidator = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.captchaValidator(req.body);
  sendResponse<RecaptchaResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'validation result',
    data: result,
  });
});
export const AuthController = {
  loginUser,
  captchaValidator,
};
