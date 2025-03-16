import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import noteRoutes from './routes/noteRoutes';
import { handleError } from './utils/errorHandler';
import logger from './middleware/logger';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(logger);
app.use('/api/notes', noteRoutes);

const mongoURI = process.env.MONGODB_URI as string;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

import { Request, Response, NextFunction } from 'express';

import { ErrorHandler } from './utils/errorHandler';

app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  handleError(err, req, res, next);
});

export default app;