import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import mainRouter from './routes/index.js';

// Middleware
import { errorMiddleware } from './middleware/errorMiddleware.js';

const app: Express = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Backend - Hello, World. Está funcional');
});

// Test route api
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'api/test - Backend - Hello, World. Está funcional' });
});

app.use('/api', mainRouter);

// Error middleware
app.use(errorMiddleware);

export default app;
