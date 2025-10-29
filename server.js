import express from 'express';
import startServer from './lib/boot.js';
import injectRoutes from './routes/index.js';
import injectMiddlewares from './lib/middlewares.js';
import 'dotenv/config';

const server = express();

// Initialize middlewares
injectMiddlewares(server);

// Initialize routes
injectRoutes(server);

// Error handling middleware
server.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

// Start the server only when this file is executed directly (node server.js).
// When imported (for example by Vercel serverless wrapper), this block will not run.
if (process.argv[1] === new URL(import.meta.url).pathname) {
  startServer(server);
}

// Export the app so it can be reused by a serverless wrapper (api/*)
export default server;
