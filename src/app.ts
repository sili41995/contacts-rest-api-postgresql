import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { IHttpError } from './types/types';
import { authRouter, contactsRouter } from './routes/api';
import { PrismaClient } from '@prisma/client';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err: IHttpError, req: Request, res: Response, next: NextFunction): void => {
  res.status(err.status).json({ message: err.message });
});

export const prisma = new PrismaClient();

export default app;
