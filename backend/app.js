import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users-router.js';
import productsRouter from './routes/products-router.js';
import errorHandler from './middlewares/error-handler-middleware.js';

const store = new session.MemoryStore();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

app.use(
    session({
      key: "sessionID",
      secret: "false",
      cookie: { maxAge: 300000000, secure: false , httpOnly: false },
      saveUninitialized: false,
      resave: false,
      store
    })
);

app.use('/api', usersRouter);
app.use('/api', productsRouter);

app.use(errorHandler);

export default app;