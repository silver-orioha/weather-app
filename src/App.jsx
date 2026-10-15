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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  async function handleSuggestions(city) {
  if (!city.trim()) {
    setSuggestions([]);
    return;
  }

  try {
    const locations = await searchLocation(city);
    setSuggestions(locations);
  } catch (error) {
    setSuggestions([]);
  }
}


async function handleSelectLocation(place) {
  try {
    setLoading(true);
    setError("");
    setSuggestions([]);

    const weatherData = await getWeather(
      place.latitude,
      place.longitude
    );

    setLocation(place);
    setWeather(weatherData);

    return true;
  } catch (error) {
    console.error(error);
    setError("Unable to fetch weather for this location.");
    setWeather(null);
    setLocation(null);

    return false;
  } finally {
    setLoading(false);
  }
}


  async function handleSearch(city) {
    try {
      setLoading(true);
      setError("");

      const locations = await searchLocation(city);
      const locationData = locations[0];

      const weatherData = await getWeather( 

        locationData.latitude,
        locationData.longitude
      );

      setLocation(locationData);
      setWeather(weatherData);
      return true;

    } catch (error) {
      console.error(error);

      setError(error.message);
      setWeather(null);
      setLocation(null);

      return false;
    } finally {
    setLoading(false);
    }
  }

  return (
    <div className="app">
      <Navbar />

      <main className="weather-container">
        <SearchBar
          onSearch={handleSearch}
          onSelectLocation={handleSelectLocation}
          onSuggestions={handleSuggestions}
          suggestions={suggestions}
        />

        {loading && (
          <p className="status-message">
            Loading weather...
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <CurrentWeather
          weather={weather}
          location={location}
        />

        <WeatherDetails weather={weather} />

        <Forecast weather={weather} />
      </main>

    </div>
  );
}

export default App;