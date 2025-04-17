import express from 'express';
import validateRequest from '../../utiils/validateRequest';
import { UserValidation } from './auth.validation';
import { UserController } from './auth.controller';
import passport from 'passport';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.register,
);

router.post(
  '/login',
  validateRequest(UserValidation.userLoginValidation),
  UserController.login,
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  UserController.me,
);

export const AuthRoutes = router;
