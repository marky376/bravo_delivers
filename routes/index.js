import { Router } from 'express';
import { APIError, errorResponse } from '../middlewares/error.js';
import orderRoutes from './orderRoutes.js'; // Ensure the file name is correct
import paymentRoutes from './payment.js'; // Import the payment routes
import RestaurantController from '../controllers/RestaurantController.js';
import MenuController from '../controllers/MenuController.js';
import OrderController from '../controllers/OrderController.js'; // Fix the import statement

/**
 * Injects routes with their handlers into the given Express application.
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
    router.post('/auth/register', RestaurantController.register);

    // Protected routes (require authentication)
    router.post('/orders',OrderController.createOrder);
    router.get('/orders/:id',OrderController.getOrder);
    router.put('/orders/:id',OrderController.updateOrder);
    router.delete('/orders/:id',OrderController.deleteOrder);

    // Menu routes
    router.post('/menu',MenuController.addMenuItem);
    router.get('/menu/:id', MenuController.getMenuItem); // Use getMenuItem here
    router.put('/menu/:id',MenuController.updateMenuItem); // Fixed method name
    router.delete('/menu/:id',MenuController.deleteMenuItem);

    // Use the order routes from another file
    router.use('/orders', orderRoutes.createOrder);
    router.use('/orders', orderRoutes.getOrderById);
    router.use('/orders', orderRoutes.updateOrder);
    router.use('/orders', orderRoutes.deleteOrder);

    // Inject payment routes
    router.use('/payments', paymentRoutes);  // Payment routes are included here

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
