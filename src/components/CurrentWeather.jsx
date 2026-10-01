import { getWeatherCondition } from "../utils/weatherConditions";

function CurrentWeather({weather, location}) {
    if (!weather || !location){
      return null;
    }

    const condition = getWeatherCondition(
    weather.current.weather_code
    );

  return (
    <section className="current-weather">
      <p className="location">{location.name},{location.country}</p>
      <div className="weather-icon">{condition.icon}</div>
      <h2>{Math.round(weather.current.temperature_2m)}°C</h2>
      <p className="condition">{condition.description}</p>
    </section>
  );
}

export default CurrentWeather;