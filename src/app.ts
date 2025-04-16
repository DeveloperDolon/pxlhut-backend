import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello world from pxlhut backend!');
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;