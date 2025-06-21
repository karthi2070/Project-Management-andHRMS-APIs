const swaggerJsdoc = require('swagger-jsdoc');
//const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee API',
      version: '1.0.0',
      description: 'API for managing employees',
    },
    servers: [
      {
        url:process.env.BASE_URL
          // url:process.env.LOCAL_BASE_URL
      },
    ],      components: {
      securitySchemes: {
          BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          },
      },
  },
  security: [
      {
          BearerAuth: [],
      },
  ],
  },
  apis: [' src/swaggerDocs/*js'], // path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs ;
