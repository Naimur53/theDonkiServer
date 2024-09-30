import axios from 'axios';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import {
  ICaptchaPayload,
  ILogin,
  ILoginResponse,
  RecaptchaResponse,
} from './auth.Interface';
import { checkDateWithinFiveMinutes, isFiveMinutesAgo } from './auth.utils';

const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
  const { email: givenEmail, password } = payload;
  let adminLoginStatus = await prisma.admin.findFirst();
  if (!adminLoginStatus) {
    adminLoginStatus = await prisma.admin.create({
      data: { failedAttempts: 0, lastLogin: new Date() },
    });
  }
  //create access token & refresh token
  if (adminLoginStatus?.failedAttempts > 3) {
    if (!isFiveMinutesAgo(adminLoginStatus.updatedAt)) {
      throw new ApiError(
        httpStatus.TOO_MANY_REQUESTS,
        `Too many failed attempts please try again after ${checkDateWithinFiveMinutes(
          adminLoginStatus.updatedAt
        )}`
      );
    }
  }

  // check is email and password valid
  if (
    givenEmail !== config.mainAdminEmail ||
    password !== config.mainAdminEmailPass
  ) {
    await prisma.admin.update({
      where: { id: '1' },
      data: { failedAttempts: { increment: 1 } },
    });
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid email or password');
  }
  await prisma.admin.update({
    where: { id: '1' },
    data: {
      failedAttempts: 0,
      lastLogin: new Date(),
    },
  });

  const id = config.mainAdminEmail;
  const role = 'admin';
  const accessToken = jwtHelpers.createToken(
    { userId: id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId: id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
const captchaValidator = async (
  payload: ICaptchaPayload
): Promise<RecaptchaResponse> => {
  const token = payload.token;
  const response = await axios.post<RecaptchaResponse>(
    `https://www.google.com/recaptcha/api/siteverify?secret=${config.captchaSecretKey}&response=${token}`
  );
  return response.data;
};
export const AuthService = {
  loginUser,
  captchaValidator,
};
