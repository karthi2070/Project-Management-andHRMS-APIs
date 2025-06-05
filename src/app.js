const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.js');


const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data    
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const employeeRoutes = require('./routers/empolyeeRoute');
const expense = require('./routers/expenceRoute');
const quotation = require('./routers/quotationRoute.js');
const clientRoutes = require('./routers/clientRoute.js');
const nodemailer = require('./routers/mailRoutes.js')
const attendance= require('./routers/attendanceRoute.js');
const task = require('./routers/taskRoute.js');
const project= require('./routers/projectRoute.js'); // Project Routes
const sprint = require('./routers/sprintRoute.js'); // Sprint Routes
const leave = require('./routers/leaveRoute.js'); // Leave Routes

app.use('/api/v1', employeeRoutes); // Employee Routes
app.use('/api/v1', expense); // Bank Details Routes
app.use('/api/v1', quotation); // Quotation Routes
app.use('/api/v1', clientRoutes); // Client Routes
app.use('/', nodemailer); // Nodemailer Routes
app.use('/api/v1', attendance); // Attendance Routes
app.use('/api/v1', task); // Task Routes
app.use('/api/v1', project); // Project Routes
app.use('/api/v1', sprint); // Sprint Routes
app.use('/api/v1', leave); // Leave Routes


app.use(errorHandler); // Centralized Error Handling Middleware


module.exports = app;
