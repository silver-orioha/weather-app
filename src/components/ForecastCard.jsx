import { getWeatherCondition } from "../utils/weatherConditions";

function ForecastCard({ date, temperature, weatherCode }) {
  const condition = getWeatherCondition(weatherCode);

  const day = new Date(date).toLocalDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="forecast-card">
      <p>{day}</p>
      <p className="forecast-icon">{condition.icon}</p>    
      <h3>{Math.round(temperature)}°C</h3>
      <p>{condition.description}</p>
    </div>
  );
}

export default ForecastCard;