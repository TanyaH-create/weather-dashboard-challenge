import dotenv from 'dotenv';
import express from 'express';


dotenv.config();

// Import the routes
import routes from './routes/index.js';
import weatherRoutes from './routes/api/weatherRoutes.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
app.use(express.static('../client/dist'));

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// TODO: Implement middleware to connect the routes
app.use('/api/weather', weatherRoutes);  // Mount weatherRoutes to the "/api/weather" endpoint
app.use(routes); //Mount all other routes from index.js


// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
