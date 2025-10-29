// Vercel serverless function wrapper that delegates requests to the Express app.
// Keep this file simple so Vercel can create a serverless function for your existing app.

import server from '../server.js';

export default async function handler(req, res) {
  try {
    // Express apps are callable as functions (req, res)
    return await server(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
}