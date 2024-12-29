import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';


// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    //destructire 
    const {cityName} = req.body;

    // Validate request body 
    if (!cityName) {
    //use client error 400 Bad Request
       return res.status(400).json({ error: 'City name is required.' });
    }
    // TODO: GET weather data from city name
    //pass the city from the request body to the method in weatherService
    const  weatherData = await WeatherService.getWeatherForCity(cityName);
 
    // TODO: save city to search history
    await HistoryService.addCity(cityName);

    //return weatherData in the response
    return res.json(weatherData);
  } catch (error) {
       console.error('Error fetching weather data', error);
       return res.status(500).json({error: 'Failed to fetch weather data'})
  }  
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    //get the list of cities
    const cities = await HistoryService.getCities();
    //check if empty
    if (!cities || cities.length === 0) {
      //if there is no search history yet, return empty array
      return res.status(200).json({ success: true, cities: []});
    }

    //send response success 200 OK - return the cities data
    //return res.status(200).json({ success: true, cities });
    return res.status(200).json(cities);
  } catch (error) {
    console.error('Error retrieving city history:', error);
    //use server error 500 - common error code for internal server error  
    return res.status(500).json({ success: false, error: 'Failed to retrieve city history.' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    // extract id property from the route  parameters
    const { id } = req.params;

    // Validate ID parameter
    if (!id) {
      //use client error 400 - bad request
      return res.status(400).json({ success: false, message: 'City ID is required.' });
    }

    // Call HistoryService to remove the city
    try {
      await HistoryService.removeCity(id);
      //use success code 200 OK
      return res.status(200).json({ success: true, message: 'City deleted.' });
    } catch (error) {
      // If an error occurs return a 404 error
      console.error('Error getting city', error)
      return res.status(404).json({ success: false, message: 'City not found.' });
    }
  } catch (error) {
    console.error('Error deleting city:', error);
    // Return a 500 Internal Server Error if something unexpected happens
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }    
});

export default router;
