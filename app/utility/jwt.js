import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your-access-token-secret';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-token-secret';

// Function to sign access token
export const signToken = (user) => {
    return jwt.sign(
        {
            id: user.id, // Add user ID here
            email: user.email
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Function to sign refresh token
export const signRefreshToken = (user) => {
    return jwt.sign(
        { userId: user.id, email: user.email },
        REFRESH_SECRET,
        { expiresIn: '7d' } // Refresh token expires in 7 days
    );
};

// Function to verify access token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

// Function to verify refresh token
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, REFRESH_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
};
