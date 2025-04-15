import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({origin: 'http://localhost:3000', credentials: true}));