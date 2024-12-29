import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
//need express types for typescript
//import express, { type Request, type Response } from 'express';

// TODO: Define route to serve index.html
// This route is a GET route for the home page
router.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});


export default router;
