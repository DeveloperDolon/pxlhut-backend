import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This is user is not found!');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
  }

  const userStatus = user?.status;

  if (userStatus === 'inactive') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is inactive!');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  }

  const JwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createToken(
    JwtPayload,
    config.jwt_secret as string,
    parseInt(config.jwt_access_token_expires_time || '3600') as number,
  );

  const refreshToken = createToken(
    JwtPayload,
    config.jwt_refresh_secret as string,
    parseInt(config.jwt_refresh_token_expires_time || '6300') as number,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const UserService = { createUserIntoDB, loginUser };
