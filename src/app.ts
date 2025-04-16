import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hi Next Level Developer !');
});

export default app;