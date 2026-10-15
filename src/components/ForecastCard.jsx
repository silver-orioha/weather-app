import { getWeatherCondition } from "../utils/weatherConditions";

function ForecastCard({ date, temperature, minTemperature, weatherCode,}) {
  const condition = getWeatherCondition(weatherCode);

  const day = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="forecast-card">
      <p>{day}</p>
      <p className="forecast-icon">{condition.icon}</p>    
      <h3>{Math.round(temperature)}°C</h3>
      <span>{Math.round(minTemperature)}°C</span>
      <p>{condition.description}</p>
    </div>
  );
}

export default ForecastCard;