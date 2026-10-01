import { useState } from "react";
import "./App.css"

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";

import { searchLocation, getWeather } from "./services/weatherApi";

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  async function handleSearch(city) {
    try {
      const locationData = await searchLocation(city);

      const weatherData = await getWeather(
        locationData.latitude,
        locationData.longitude
      );

      setLocation(locationData);
      setWeather(weatherData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="app">
      <Navbar />

      <main className="weather-container">
        <SearchBar onSearch={handleSearch} />

        <CurrentWeather
          weather={weather}
          location={location}
        />

        <WeatherDetails
          weather={weather}
        />

        <Forecast
          weather={weather}
        />
      </main>
    </div>
  );
}

export default App;