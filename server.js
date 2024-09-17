import express from 'express';
import startServer from './lib/boot.js';
import injectRoutes from './routes/index.js';
import injectMiddlewares from './lib/middlewares.js';
import paymentRoutes from './routes/payment.js';  // Import payment routes
import 'dotenv/config';
const server = express();

injectMiddlewares(server);
injectRoutes(server);

// Use the correct instance for handling payment routes
server.use('/api/payments', paymentRoutes);

startServer(server);

export default server;
