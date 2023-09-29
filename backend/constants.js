export const PORT = process.env.PORT || 3031;
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