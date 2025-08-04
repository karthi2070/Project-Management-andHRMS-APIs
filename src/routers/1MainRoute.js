const express = require('express');
const app = express();
const ActivityLogs= require('../routers/activityLogRoutes')
const admin = require('../routers/adminRoute');
const auth = require('../routers/authRoute');
const attendance = require('../routers/attendanceRoute');
const client = require('../routers/clientRoute');
const comments = require('../routers/commentsRoute');
const employee = require('../routers/empolyeeRoute');
const expense = require('../routers/expenceRoute');
const holiday = require('../routers/holidayRoute');
const leave = require('../routers/leaveRoute');
const nodemailer = require('../routers/mailRoutes');
const openAi = require('../routers/openAiRute');
const paySlip = require('../routers/paySlipRoute');
const project = require('../routers/projectRoute');
const quotation = require('../routers/quotationRoute');
const service = require('../routers/serviceRoute');
const sprint = require('../routers/sprintRoute');
const subTask = require('../routers/subTaskRoute');
const task = require('../routers/taskRoute');


app.use('/activity-log', ActivityLogs);
app.use('/admin', admin);
app.use('/auth', auth);
app.use('/attendance', attendance);
app.use('/client', client);
app.use('/comments', comments);
app.use('/employee', employee);
app.use('/expense', expense);
app.use('/holidays', holiday);
app.use('/leave', leave);
app.use('/mail', nodemailer);
app.use('/openAi', openAi);
app.use('/paySlip', paySlip);
app.use('/project', project);
app.use('/quotation', quotation);
app.use('/service', service);
app.use('/sprint', sprint);
app.use('/sub-task', subTask);
app.use('/task', task);


module.exports = app;