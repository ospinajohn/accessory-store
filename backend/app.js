import express from 'express';
import productsRouter from './routes/products.routes.js';
const app = express();

app.use(express.json());

app.use("/api", productsRouter);

export default app;