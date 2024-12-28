import fs from 'fs/promises';
import path from 'path';

// TODO: Define a City class with name and id properties
class City {
  constructor(public name: string, public id: string) {{};}
}


class HistoryService {
  private filePath = path.resolve(__dirname, 'searhHistory.json');

  // TODO: Define a read method that reads from the searchHistory.json file
  
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      if (error.code === 'ENOENT') {
        // If file doesn't exist, return an empty array
        return [];
      }
      throw new Error('Failed to read search history');
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
      await fs.writeFile(this.filePath, data, 'utf-8');
    } catch (error) {
      throw new Error('Failed to write to search history');
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(name: string): Promise<void> {
    const cities = await this.read();

    // Generate a unique ID for the new city
    const id = `${Date.now()}`;
    const city = new City(name, id);

    // Avoid duplicate cities (based on name)
    if (cities.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      throw new Error('City already exists in search history');
    }

    cities.push(city);
    await this.write(cities);
  }


  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter((city) => city.id !== id);

    if (cities.length === updatedCities.length) {
      throw new Error('City not found');
    }

    await this.write(updatedCities);
  }
}

export default new HistoryService();
