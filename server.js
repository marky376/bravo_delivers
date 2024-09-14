import express from 'express';
import startServer from './lib/boot.js';
import injectRoutes from './routes/index.js';
import injectMiddlewares from './lib/middlewares.js';


const server = express();

injectMiddlewares(server);
injectRoutes(server);

startServer(server);

export default server;