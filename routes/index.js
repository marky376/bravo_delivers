import { Router } from 'express';
import { errorResponse } from '../middlewares/error.js';

/**
 * Injects routes with their handlers into the given Express application.
 * @param {Express} api
 */
const injectRoutes = (api) => {
    // Create a new router instance
    const router = Router();

    // Health check route that always works
    router.get('/api/status', (req, res) => {
        res.status(200).json({ 
            status: 'ok', 
            message: 'Server is running',
            timestamp: new Date().toISOString()
        });
    });

    // Simple test routes that don't require database
    router.get('/api/test', (req, res) => {
        res.status(200).json({ message: 'API is working!' });
    });

    // Menu mock route
    router.get('/api/menu', (req, res) => {
        res.status(200).json({ 
            status: 'success',
            data: [],
            message: 'Menu endpoint - database not yet configured'
        });
    });

    // Auth mock routes
    router.post('/api/auth/login', (req, res) => {
        res.status(501).json({ 
            status: 'error',
            message: 'Authentication not yet configured. Please set up database and environment variables.'
        });
    });

    router.post('/api/auth/register', (req, res) => {
        res.status(501).json({ 
            status: 'error',
            message: 'Registration not yet configured. Please set up database and environment variables.'
        });
    });

    // Handle 404 errors for API routes
    router.all('/api/*', (req, res) => {
        res.status(404).json({
            status: 'error',
            statusCode: 404,
            message: `Cannot ${req.method} ${req.url}`,
            availableEndpoints: [
                'GET /api/status',
                'GET /api/test',
                'GET /api/menu',
                'POST /api/auth/login',
                'POST /api/auth/register'
            ]
        });
    });

    // Handle other errors
    router.use(errorResponse);

    // Apply the routes to the Express app
    api.use(router);
};

export default injectRoutes;
