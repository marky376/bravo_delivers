import jwt from 'jsonwebtoken';
import { APIError } from './error';

const secretKey = process.env.JWT_SECRET || 'secret';

/**
 * Generate a new JWT token for a user.
 */

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

/**
 * Verify and decode a JWT token.
 */

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new APIError(401, 'INvalid or expired token.');
    }
}

export { generateToken, verifyToken };