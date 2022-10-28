import express from 'express';
import errorMiddleware from './middlewares/errors.js';
import authRouter from './routes/auths.routes.js';
import productsRouter from './routes/products.routes.js';

const app = express();

app.use(express.json());

app.use('/api', productsRouter);
app.use('/api', authRouter);

// Error middleware
app.use(errorMiddleware);

export default app;
