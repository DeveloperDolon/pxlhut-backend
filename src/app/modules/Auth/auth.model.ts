import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './auth.interface';
import { UserStatus } from './auth.constant';
import bcrypt from 'bcrypt';
import config from '../../config';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String, 
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'superuser'],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_solid_rounds),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChange = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimeStamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimeStamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
