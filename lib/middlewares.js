import express from 'express';

const injectMiddlewares = (server) => {
    // Middleware for parsing JSON
    server.use(express.json());

    // Example of custom middleware
    server.use((req, res, next) => {
        console.log(`${req.method} request to ${req.url}`);
        next();
    });

};

export default injectMiddlewares;