const app = require('express').Router();
const loginRoute = require('../controllers/loginController');
const  auth  = require('../middleware/authMiddleware');

app.post('/employee/login', loginRoute.login);
app.post('/employee/register', loginRoute.register); 
app.get('/employee/get-user-by-id/:id',auth, loginRoute.getUserById);
app.get('/employee/get-all-users',auth, loginRoute.getAllUser);
app.get('/employee/get-user-by-mail/:mail', loginRoute.getUserByEmail);

module.exports = app;