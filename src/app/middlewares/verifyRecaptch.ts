import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../config';
import ApiError from '../../errors/ApiError';
// Define interfaces
type ICaptchaPayload = {
  token: string;
};

type RecaptchaResponse = {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
};

// Function to validate the token
const captchaValidator = async (
  payload: ICaptchaPayload
): Promise<RecaptchaResponse> => {
  const token = payload.token;
  const response = await axios.post<RecaptchaResponse>(
    `https://www.google.com/recaptcha/api/siteverify?secret=${config.captchaSecretKey}&response=${token}`
  );
  return response.data;
};

// Middleware function to check reCAPTCHA token

const verifyRecaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token from the request (from body, query, or headers)
    const token =
      req.body.token || req.query.token || req.headers['authorization'];
    // console.log(req.headers['authorization']);
    // If no token is found, return a 400 error
    if (!token) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token');
    }

    // Validate the token
    const captchaResponse = await captchaValidator({ token });
    console.log(captchaResponse);
    // If validation fails, return a 403 error
    if (!captchaResponse.success) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid captcha');
    }

    // If the token is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors and respond with a 500 status
    console.error('Error verifying reCAPTCHA:', error);
    next(error);
  }
};

export default verifyRecaptcha;
