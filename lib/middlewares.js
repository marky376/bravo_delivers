import express from 'express';
import cors from 'cors';

const injectMiddlewares = (server) => {
    // Enable CORS
    server.use(cors());

    // Middleware for parsing JSON
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // Static files are handled by Vercel, not Express in production
    // Express static middleware only for local development

    // Log requests
    server.use((req, res, next) => {
        console.log(`${req.method} request to ${req.url}`);
        next();
    });

};

export default injectMiddlewares;