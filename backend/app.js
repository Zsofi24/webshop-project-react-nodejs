import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users-router.js';
import productsRouter from './routes/products-router.js';
import cartItemsRouter from './routes/cart-items-router.js';
import ordersRouter from './routes/orders-router.js';
import ordersProductsRouter from './routes/orders-products-router.js';
import categoriesRouter from './routes/categories-router.js';
import billingAddressesRouter from './routes/billing-addresses-router.js';
import shippingAddressesRouter from './routes/shipping-addresses-router.js';
import errorHandler from './middlewares/error-handler-middleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDocs from 'swagger-jsdoc';
import { swaggerOptions } from './constants.js';


const store = new session.MemoryStore();
const app = express();
const specs = swaggerJSDocs(swaggerOptions);

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
app.use('/api', cartItemsRouter);
app.use('/api', ordersRouter);
app.use('/api', ordersProductsRouter);
app.use('/api', categoriesRouter);
app.use('/api', shippingAddressesRouter);
app.use('/api', billingAddressesRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

export default app;