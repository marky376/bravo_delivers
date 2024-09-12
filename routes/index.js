import { Express } from 'express';
import RestaurantController from '../controllers/RestaurantController';
import OrderController from '../controllers/OrderController';
import MenuController from '../controllers/MenuController';
import { authenticateUser } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';


/**
 * Injects routes with their handlers to the given Express application.
 * @param {Espress} api
 */

const injectRoutes = (api) => {
    //Public routes
    api.get('/status', RestaurantController.getStatus);
    api.get('/menu', MenuController.getMenu);

    // Authentication routes
    api.post ('/auth/login', RestaurantController.login);
    api.post('/auth/register', MenuController.getMenu);

    // Protected routes
    api.post('/orders', authenticateUser, OrderController.createOrder);
    api.get('/orders/:id', authenticateUser, OrderController.getOrder);
    api.put('/orders/:id', authenticateUser, OrderController.updateOrder);
    api.delete('/orders/:id', authenticateUser, OrderController.deleteOrder);


    // Menu routes
    api.post('/menu', authenticateUser, MenuController.addMenuItem);
    api.get('/menu/:id', MenuController.getMenuItem);
    api.put('/menu/:id', authenticateUser, MenuController.updateItem);
    api.delete('/menu/:id', authenticateUser, MenuController.deleteMenuItem);

    // Handle 404 errors
    api.all('*', (req, res, next) => {
        errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);

    });

    //Handle other errors
    api.use(errorResponse);

};


export default injectRoutes;