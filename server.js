import express from 'express';
import startServer from './libs/boot.js';
import injectRoutes from './routes/index.js';
import injectMiddlewares from './lib/middlewares';


const server = express();

injectMiddlewares(server);
injectRoutes(server);

startServer(server);

export default server;