const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.js');


const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data    
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const employeeRoutes = require('./routers/empolyeeRoute');

app.use('/api/v1', employeeRoutes); // Employee Routes



app.use(errorHandler); // Centralized Error Handling Middleware


module.exports = app;
