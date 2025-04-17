import express from 'express';
import validateRequest from '../../utiils/validateRequest';
import { PaymentValidation } from './payment.validation';
import { PaymentController } from './payment.controller';
import passport from 'passport';

const router = express.Router();

router.post(
  '/checkout',
  validateRequest(PaymentValidation.checkoutValidation),
  passport.authenticate('jwt', { session: false }),
  PaymentController.createPayment,
);

export const PaymentRoutes = router;
