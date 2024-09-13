import { Router } from 'express';
import RestaurantController from '../controllers/RestaurantController.js';
import OrderController from '../controllers/OrderController.js';
import MenuController from '../controllers/MenuController.js';
import { authenticateUser } from '../middlewares/auth.js';
import { APIError, errorResponse } from '../middlewares/error.js';
import orderRoutes from './orderRoutes.js'; // Ensure the file name is correct

/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} api
 */
const injectRoutes = (api) => {
    // Create a new router instance
    const router = Router();

    // Public routes
    router.get('/status', RestaurantController.getStatus);
    router.get('/menu', MenuController.getMenu);

    // Authentication routes
    router.post('/auth/login', RestaurantController.login);
    router.post('/auth/register', MenuController.register); // Assuming there’s a register method

    // Protected routes
    router.post('/orders', authenticateUser, OrderController.createOrder);
    router.get('/orders/:id', authenticateUser, OrderController.getOrder);
    router.put('/orders/:id', authenticateUser, OrderController.updateOrder);
    router.delete('/orders/:id', authenticateUser, OrderController.deleteOrder);

    // Menu routes
    router.post('/menu', authenticateUser, MenuController.addMenuItem);
    router.get('/menu/:id', MenuController.getMenuItem);
    router.put('/menu/:id', authenticateUser, MenuController.updateItem);
    router.delete('/menu/:id', authenticateUser, MenuController.deleteMenuItem);

    // Use the order routes from another file
    router.use('/orders', orderRoutes);

    // Handle 404 errors
    router.all('*', (req, res, next) => {
        errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
    });

    // Handle other errors
    router.use(errorResponse);

    // Apply the routes to the Express app
    api.use(router);
};

export default injectRoutes;
