# Weather Dashboard

## Description
The Weather Dashboard is a full-stack web application that allows users to search for current weather conditions and a 5-day forecast for multiple cties that is rebdered from the OpenWeather API. The cities serached for are saved and shown in a history list for quick access. 

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshot](#screenshot)
- [API Routes](#API Routes)
- [Contributing](#contributing)
- [Technology Used](#technology used)
- [Deployed Application](#deployed)
- [Questions](#questions)


## Features

1.  Search for a city to view the current weather information and to create a 5-Day forecast. 
2.  Displays the following information
  - City Name
  - Date
  - Weather icon
  - Temperature
  - Humidity
  - Wind speed
3. Saved search history with buttons for quick access to prevuiously searched cities
4. Ability to delete cities from search history.


## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone git@github.com:TanyaH-create/weather-dashboard-challenge.git

3. Navigate to the project directory 
   ```bash
   cd weather-dashboard-challenge

4. Install required dependencies:
   ```bash
   npm install

5. Create a .env file in the root server directory and add your OpenWeather API key:
   ```bash
   API_KEY=YOUR-OPENWEATHER-API-KEY

6.  Run the application
    ```bash
    npm start

## Usage
1. Open the application in your browser

2. Enter the city name in the search bar to retrieve weather data.

3. The current weather data and a 5-day forecast of weather will be displayed. The 5-day weather data is for noon-time.

4. To retrieve data for a previously search city, click on the city in the history list.

5. To delete a city from the serach list use the delete button next to the city in the history list.

## Screenshot
![Screenshot 2024-12-29 192507](https://github.com/user-attachments/assets/086322ec-0db1-4c31-b494-5bc11a4f47af)

## API Routes

- GET /API/weather/history :Retrieve a list of saved cities
- POST /api/weather :Save a city to search history and retrieve it's weather data
- DELTE /api/weather/history/:id :Remove a city from the search history

## Contributing
Contributions are welcome! Please follow these steps:
1.	Fork the repository.
2.	Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature-name
3.	Commit your changes:
    ```bash
    git commit -m "Add feature-name"
4.	Push your branch:
    ```bash
    git push origin feature-name
5.	Submit a pull request.

## Technology Used
 - Frontend: HTML, CSS, Javascript
 - Development: Typescript
 - Backend: Node.js, Express.js
 - Storage: JSON file for search history
 - Deployment: Render

## Deployed Application
 - Live URL: 


## Questions

 If you have any questions, feel free to contact me at dougtanyah@gmail.com.

 You can also find me on GitHub at [TanyaH-create](https://github.com/TanyaH-create).




 
