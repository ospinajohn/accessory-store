import express from 'express';
import errorMiddleware from './middlewares/errors.js';
import authRouter from './routes/auths.routes.js';
import productsRouter from './routes/products.routes.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use('/api', productsRouter);
app.use('/api', authRouter);

// Error middleware
app.use(errorMiddleware);

export default app;
