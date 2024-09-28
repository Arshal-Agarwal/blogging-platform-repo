import { verifyToken } from './jwt';

export const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized access, token missing' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Add user information to the request
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized access, invalid token' });
    }
};
