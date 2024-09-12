import { APIError } from '../utils/errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let users = []; // This will simulate a database for users, replace with actual db logic later.

const generatedUserId = () => Math.random().toString(36).substring(2, 9);


/**
 * Register a new user.
 */

const register = async ({ email, password, name }) => {
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
        throw new APIError(400, `User with this email already exists`);

    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: generatedUserId(),
        email,
        password: hashedPassword,
        name,
        cratedAt: new Date(),
    };

    users.push(newUser);
    return newUser;
}

/**
 * Login in an existing user.
 */

const login = async (email, password) => {
    const user = users.find((user) => user.email === email);
    if (!user) {
        throw new APIError(401, 'INvalid email or password.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new APIError(401, 'Invalid email or password.');

    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });

    return token;
}

export default {
    register,
    login,
}