import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  name: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt: Date;
  status: 'active' | 'inactive' | 'in-progress';
  role: 'admin' | 'user' | 'superuser';
  isDeleted: boolean;
}

export type TLoginUser = {
  email: string;
  password: string
}

export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChange(
    passwordChangedTimestamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}



export type TUserRole = typeof USER_ROLE;
