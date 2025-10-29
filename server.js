import express from 'express';
import startServer from './lib/boot.js';
import injectRoutes from './routes/index.js';
import injectMiddlewares from './lib/middlewares.js';
import paymentRoutes from './routes/payment.js';
import MenuRoutes from './routes/MenuRoutes.js';
import 'dotenv/config';

const server = express();

injectMiddlewares(server);
injectRoutes(server);

server.use('/api/payments', paymentRoutes);
server.use('/api', MenuRoutes);

// Start the server only when this file is executed directly (node server.js).
// When imported (for example by Vercel serverless wrapper), this block will not run.
if (process.argv[1] === new URL(import.meta.url).pathname) {
  startServer(server);
}

// Export the app so it can be reused by a serverless wrapper (api/*)
export default server;
