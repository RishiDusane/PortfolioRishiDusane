import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { portfolioRoutes } from './routes/portfolioRoutes.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.clientOrigins.includes(origin)) return callback(null, true);
      const error = new Error('Origin is not allowed by CORS.');
      error.status = 403;
      return callback(error);
    },
  }),
);
app.use(express.json({ limit: '16kb' }));
app.use(morgan('combined'));
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 120,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: { message: 'Too many requests. Please try again later.' } },
  }),
);
app.use('/api', portfolioRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
