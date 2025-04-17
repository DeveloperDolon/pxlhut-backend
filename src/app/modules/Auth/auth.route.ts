import express from 'express';
import validateRequest from '../../utiils/validateRequest';
import { UserValidation } from './auth.validation';
import { UserController } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.register,
);

router.post(
  '/login',
  validateRequest(UserValidation.userLoginValidation),
  UserController.login
)

export const AuthRoutes = router;