import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import passport from 'passport';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world from pxlhut backend!');
});

app.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(200).json({
      message: 'welcome to the protected route!',
    });
  },
);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
