import dotenv from 'dotenv';
dotenv.config();


//TO DO Define an interface for the Coordinates object
interface Coordinates {
  lat: number;  //lattitude
  lon: number; //longitude
}

//TO-DO Define a class for the Weather object: 
class Weather {
  cityName: string;
  date: string;
  icon: string;
  description: string;
  temperature: number;  
  windSpeed: number;
  humidity: number;
  constructor(
    cityName: string,
    date: string,
    icon: string,
    description: string,
    temperature: number,  
    windSpeed: number,
    humidity: number
  ) {
    this.cityName = cityName;
    this.date = date;
    this.icon = icon;
    this.description = description;
    this.temperature = temperature;   
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties
  private baseURL = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = '73495b635061549f62b2439ebf4e6ed1';

  // TODO: Create fetchLocationData method
  // This function is responsible for making an API call to the geocoding service
   private async fetchLocationData(query: string): Promise<any> {
    // build endpoint to get the city geocoding data
    const url = this.buildGeocodeQuery(query);
    //fetch the city geocodeing data
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    //return the geocoding data object from weather API
    const data = await response.json();
    console.log('fetchLocationData JSON response:', data)
    if (data.length === 0) {
      throw new Error('No location data found for the specified city');
    }
    
    return data;
  }

  // TODO: Create destructureLocationData method
  // This function takes the location data returned from API and extracts the relevant co-ordinates
  // in form of latitude and longitude. It returns the coordinates as an instance of Coordinates.
  private destructureLocationData(locationData: any): Coordinates {
    //return an instance of a  Coordinates object
      console.log('Time to destructure the data', locationData)
      //locationData is an array of objects so destructure
      const {lat, lon} = locationData[0];
      //return an object of type Coordinates
      return {
          lat,
          lon,
      }
  }

  // TODO: Create buildGeocodeQuery method
  // This function constructs a query string for the geocoding based on the city input
  // Return: It returns a properly formatted URL that can be used to request location data from the geocoding API.
  private buildGeocodeQuery(query: string): string{
     //use geocoding API, not base url
      return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${this.apiKey}`
  }
  // TODO: Create buildWeatherQuery method
  // This function constructs a query string for the weather API using the geographical coordinated obtained from
  // the geocoding API.  It returns a URL that can be used to fetch weather data for the specified coordinates.
  private buildWeatherQuery(coordinates: Coordinates): string {
    //using coordinates, query using imperial units to get farenheight
    return `${this.baseURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }


  // TODO: Create fetchAndDestructureLocationData method
  //This function makes an API call to the weather service to get the location coordinates
  private async fetchAndDestructureLocationData(cityName: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(cityName);
    console.log('fetched location data', locationData);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method
  // This function makes an API call to the weather service and returns a response object from 
  // the API
  private async fetchWeatherData(coordinates: Coordinates) {
    console.log('In fetchWeatherData');
    const url = this.buildWeatherQuery(coordinates);
    console.log('buildWeatherQuery', url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    return response.json();
  }

  // TODO: Build parseCurrentWeather method
  // This function processes the weather data response from the API to extract relevant information about the current weather condition
  //It returns a structured object of type Weather
   private parseCurrentWeather(response: any): Weather {
    const weather = response.list[0];
    return new Weather(
      response.city.name,
      new Date(weather.dt * 1000).toISOString(),
      weather.weather[0].icon,
      weather.weather[0].description,     
      weather.main.temp,
      weather.wind.speed,
      weather.main.humidity
    );
   }


  // TODO: Complete buildForecastArray method
  // This function takes the current weather data and an array of forecast data and combines them into a single array that represents the weather forecast.
  // It returns an array of forecast objects, minus the current weather object, that can be used to display the weather forecast.
  private buildForecastArray(weatherData: any[]): Weather[] {
    return weatherData.slice(1).map((item: any) => {
      return new Weather(
        item.city?.name || '',
        new Date(item.dt * 1000).toISOString(),
        item.weather[0].icon,
        item.weather[0].description,
        item.main.temp,
        item.wind.speed,
        item.main.humidity
      );
    });
  }


  // TODO: Complete getWeatherForCity method
  // This is the main function that orchestrates the entire process. It takes a city name as input, builds the necessary queries, fetches the location 
  // and weather data, and returns the final weather information.
  // It returns the current weather and forecast data for the specified city.
  async getWeatherForCity(cityName: string): Promise<Weather[]> {
    //get the coordinates of the city
    const coordinates = await this.fetchAndDestructureLocationData(cityName);
    console.log('The Location Data Coordinates have been fetched:', coordinates)
    //use the coordinates to get the weather data
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = await this.parseCurrentWeather(weatherData);
    const forecast = this.buildForecastArray(weatherData.list);

    
    return [currentWeather, ...forecast];
  }
}

export default new WeatherService();
