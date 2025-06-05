const loginModel = require('../models/loginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const loginController = {
    async register(req, res, next) {
        try {
            const { name,mail,ph_num,password} = req.body;
            const hashedpassword =await bcrypt.hash(password,10);
            const userData= {name :name, mail:mail, ph_num:ph_num, hashedpassword:hashedpassword};
            const user = await loginModel.register(userData);

            res.status(201).json({ success: true, data: user });
        } catch (error) {
            next(error); // Pass to error handler middleware
        }
    },
    async login (req, res, next) {
        try{

            const {mail,password }= req.body;
            const user = await loginModel.getEmail(mail);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            const token = jwt.sign({id:user.id, mail:user.mail}, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, token: token, user: { id: user.id, email: user.email } });
        }
        catch (error) {
            next(error); // Pass to error handler middleware
        }
    },

    async getUserById(req, res, next) {
        try {   
            const userId = req.user.id; // Assuming user ID is stored in req.user by authentication middleware
            const user = await loginModel.getUserById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            res.status(200).json({ success: true, data: user });
        }catch (error) {
            next(error); // Pass to error handler middleware
        }
    },
    async getAllUser(req, res, next) {
        try {
            const users = await loginModel.getAllUsers();
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            next(error); 
        }
    },
    async getUserByEmail(req, res, next) {
        try {
            const { mail } = req.query; // Assuming email is passed as a query parameter
            const user = await loginModel.getEmail(mail);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            next(error); // Pass to error handler middleware
        }
    }

};
module.exports = loginController;