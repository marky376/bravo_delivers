import express from 'express';
import startServer from './libs/boot';
import injectRoutes from './routes';
import injectMiddlewares from './lib/middlewares';
import { connectDB } from './database'; // Import the connection


const server = express();

injectMiddlewares(server);
injectRoutes(server);
connectDB(); // Connect to the database
startServer(server);

export default server;