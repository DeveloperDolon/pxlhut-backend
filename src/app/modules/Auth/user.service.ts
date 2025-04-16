import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const user = User.create(payload);

  return user;
};

export const UserService = { createUserIntoDB };
