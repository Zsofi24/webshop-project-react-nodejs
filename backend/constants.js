import Stripe from 'stripe';

export const PORT = process.env.PORT || 3031;
export const CLIENT_URL = `http://localhost:${process.env.CLIENT_PORT}`;

export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'webshop portfolio site API documentation',
        version: '1.0.0',
        description: 'API documentation for webshop backend',
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
        },
      ],
    },
    apis: ['**/*.yaml'],
  };

export const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
