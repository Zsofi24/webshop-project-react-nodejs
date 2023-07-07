import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users-router.js';
import productsRouter from './routes/products-router.js';
import errorHandler from './middlewares/error-handler-middleware.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3001']
}));

app.use('/api', usersRouter);
app.use('/api', productsRouter);

app.use(errorHandler);

export default app;