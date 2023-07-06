import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users-router.js';
import productsRouter from './routes/products-router.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', usersRouter);
app.use('/api', productsRouter);


export default app;