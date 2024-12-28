import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';


// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  //user enters city and it is passed in the request body
  const {city} = req.body;

  // Validate request body to make sure it is a string
  if (!city || typeof city !== 'string') {
    //use client error 400 Bad Request
    return res.status(400).json({ error: 'City name is required and must be a string.' });
  }
  // TODO: GET weather data from city name
  //pass the city from the request body to the method in weatherService
  const  weatherData = await WeatherService.getWeatherForCity(city);
   
  // TODO: save city to search history
  await HistoryService.addCity(city);
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();

    //check if empty
    if (!cities || cities.length === 0) {
      //use client error 404 - not found
      return res.status(404).json({ success: false, message: 'No city history found.' });
    }

    //send response success 200 OK
    res.status(200).json({ success: true, cities });
  } catch (error: any) {
    console.error('Error retrieving city history:', error.message);
    //use server error 500 - common error code for internal server error  
    res.status(500).json({ success: false, error: 'Failed to retrieve city history.' });
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
    // 
    const result = await HistoryService.removeCity(id);
    //error handling - use client error 404 'not found'
    if (!result) {
      return res.status(404).json({ success: false, message: 'City not found.' });
    }
    //susccessful use success code 200 OK
    res.status(200).json({ success: true, message: 'City deleted.' });
  } catch (error) {
    console.error('Error deleting city:', error.message);
    //use internal server error code
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

export default router;
