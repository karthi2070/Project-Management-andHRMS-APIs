const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.js');
require('../src/config/passport.js');
const errorHandler = require('./middleware/errorHandler');
const passport = require('passport');
const app = express();
const allowedOrigins = [
  'https://www.n1suite.namuvi.com',
  'https://n1suite.namuvi.com',
  'https://api.sellero2.com/n1suite',
  'https://api.sellero2.com',
  'http://localhost:3002',
  'http://localhost:5173',
];


app.use(cors({
  origin: function (origin, callback) {
console.log('CORS Origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data    
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const employee = require('./routers/empolyeeRoute');
const expense = require('./routers/expenceRoute');
const quotation = require('./routers/quotationRoute.js');
const clientRoutes = require('./routers/clientRoute.js');
const service = require('./routers/serviceRoute.js')
const nodemailer = require('./routers/mailRoutes.js')
const attendance = require('./routers/attendanceRoute.js');
const project = require('./routers/projectRoute.js'); // Project Routes
const sprint = require('./routers/sprintRoute.js'); // Sprint Routes
const task = require('./routers/taskRoute.js');
const subTask = require('./routers/subTaskRoute.js')
const leave = require('./routers/leaveRoute.js'); // Leave Routes
const holiday = require('./routers/holidayRoute.js'); // Holiday Routes
const comments = require('./routers/commentsRoute.js')
const activityLog = require('./routers/activityLogRoutes.js')
const openAi = require('./routers/openAiRute.js'); // OpenAI Routes
const salarySlip =require('./routers/paySlipRoute.js')


const authRoutes = require('./routers/authRoute');
const adminRoutes = require('./routers/adminRoute');
const attendanceRoutes = require('./routers/attendRoute');
const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware.js');
const checkModuleAccess = require('./middleware/rbacMiddleware');

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
//app.use('/admin', authMiddleware, adminMiddleware, adminRoutes);
app.use('/attendance', authMiddleware, checkModuleAccess('attendance'), attendanceRoutes);
app.use('/api/v1', employee); // Employee Routes
app.use('/api/v1', expense); // Bank Details Routes
app.use('/api/v1', quotation); // Quotation Routes
app.use('/api/v1', clientRoutes); // Client Routes
app.use('/api/v1', service); // Service Routes
app.use('/', nodemailer); // Nodemailer Routes
app.use('/api/v1', attendance); // Attendance Routes
app.use('/api/v1', project); // Project Routes
app.use('/api/v1', sprint); // Sprint Routes
app.use('/api/v1', task); // Task Routes
app.use('/api/v1', subTask); // Task Routes
app.use('/api/v1', leave); // Leave Routes
app.use('/api/v1', comments);
app.use('/api/v1', holiday); // Holiday Routes
app.use('/',salarySlip)

app.use('/api/v1', activityLog);
app.use('/api/v1', openAi); // OpenAI Routes

app.use(errorHandler); // Centralized Error Handling Middleware


module.exports = app;
