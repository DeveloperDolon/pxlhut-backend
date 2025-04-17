import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { PaymentRoutes } from '../modules/Payment/payment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    router: AuthRoutes,
  },
  {
    path: '/payments',
    router: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
