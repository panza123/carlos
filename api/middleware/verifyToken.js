// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../model/auth.model.js'; // Adjust the path as necessary

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided noty admin.' });
    }

    

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
        req.user = await User.findById(decoded.id); // Find user by ID from the token
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
