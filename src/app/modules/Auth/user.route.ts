import express from 'express';
import validateRequest from '../../utiils/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.register,
);

export const AuthRoutes = router;