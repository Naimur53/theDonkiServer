import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get authorization tokens
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    // verify token
    let verifiedUser = null;

    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

    // check email
    if (config.mainAdminEmail !== verifiedUser.userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized');
    }
    req.user = verifiedUser; // role  , userid

    // role diye guard korar jnno
    if (verifiedUser.role !== 'admin') {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
