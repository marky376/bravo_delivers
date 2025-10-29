// Vercel serverless function wrapper that delegates requests to the Express app.
// Keep this file simple so Vercel can create a serverless function for your existing app.

import server from '../server.js';

export default function handler(req, res) {
  // Express apps are callable as functions (req, res)
  return server(req, res);
}