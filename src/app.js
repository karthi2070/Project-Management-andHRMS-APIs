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
const expense = require('./routers/expenceRoute');
const client = require('./routers/quotationRoute.js');
const clientRoutes = require('./routers/clientRoute.js');

app.use('/api/v1', employeeRoutes); // Employee Routes
app.use('/api/v1', expense); // Bank Details Routes
app.use('/api/v1', client);
app.use('/api/v1', clientRoutes); // Client Routes



app.use(errorHandler); // Centralized Error Handling Middleware


module.exports = app;
