const jwt =require('jsonwebtoken');
const dotenv =require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const header = req.header['Authorization']
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        next({
            status: 401,
            message: 'Invalid token',
            error: error.message
        });
    }

}
module.exports = authMiddleware;