import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const injectMiddlewares = (server) => {
    // Enable CORS
    server.use(cors());

    // Middleware for parsing JSON
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // Serve static files
    server.use(express.static(path.join(__dirname, '..')));

    // Example of custom middleware
    server.use((req, res, next) => {
        console.log(`${req.method} request to ${req.url}`);
        next();
    });

};

export default injectMiddlewares;