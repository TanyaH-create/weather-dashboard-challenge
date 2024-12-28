import fs from 'fs/promises';
import path from 'path';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  };
}


class HistoryService {
  private filePath = path.resolve(__dirname, 'searhHistory.json');

  // TODO: Define a read method that reads from the searchHistory.json file
  
  private async read(): Promise<City[]> {
    try {
      //read and store data
      const data = await fs.readFile(this.filePath, 'utf-8');
      //parse to an array of City objects
      return JSON.parse(data) as City[];
    } catch (error) {
        console.error('Error reading hisory', error)
        // If file doesn't exist, return an empty array
        return [];
      }  
   }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  //an array of city objects is passed to the method
  private async write(cities: City[]): Promise<void> {
    try {
      //convert to a JSON string  to be written to file: no replacer function, use 2 spaces
      const data = JSON.stringify(cities, null, 2);
      //write the data to the file HistoryService.filepath = searhHistory.json
      await fs.writeFile(this.filePath, data, 'utf-8');
    } catch (error) {
      console.error('Error writing search history', error);
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(name: string): Promise<void> {
    
    const cities = await this.read();

    // Generate a unique ID for the new city using a UTC date/time stamp
    const id = `${Date.now()}`;
    const city = new City(name, id);

    // Avoid duplicate cities (based on name)
    if (cities.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      throw new Error('City already exists in search history');
    }
    //add current city to the cities array
    cities.push(city);
    await this.write(cities);
  }


  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    //read in current ist of data 
    const cities = await this.read();
    // create a new array by using filter - exclude the city with the id being passed to be removed
    const updatedCities = cities.filter((city) => city.id !== id);
    
    //if the cit is not found, the length of the curent cities and updated cities will match
    //throw and error
    if (cities.length === updatedCities.length) {
      throw new Error('City not found');
    }
    //if city is found, write the new  list
    await this.write(updatedCities);
  }
}

export default new HistoryService();
