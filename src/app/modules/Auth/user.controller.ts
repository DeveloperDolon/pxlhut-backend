import httpStatus from 'http-status';
import catchAsync from '../../utiils/catchAsync';
import sendRespnse from '../../utiils/sendResponse';
import { UserService } from './user.service';

const register = catchAsync(async (req, res) => {
  const { data: userData } = req.body;
  
  const result = await UserService.createUserIntoDB(userData);

  return sendRespnse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successful',
    data: result,
  });
});

export const UserController = { register };
