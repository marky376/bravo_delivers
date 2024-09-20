import express from 'express';
import startServer from './lib/boot.js';
import injectRoutes from './routes/index.js';
import injectMiddlewares from './lib/middlewares.js';
import paymentRoutes from './routes/payment.js';  // Import payment routes
import MenuRoutes from './routes/MenuRoutes.js';  // Import MenuRoutes
import 'dotenv/config';
const server = express();

injectMiddlewares(server);
injectRoutes(server);


server.use('/api/payments', paymentRoutes);
server.use('/api', MenuRoutes);
startServer(server);

export default server;
