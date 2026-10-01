
import ForecastCard from "./ForecastCard";

function Forecast({weather}) {
  if (!weather){
    return null;
  }

  return (
    <section className="forecast">
      <h2>7-Day Forecast</h2>

      <div className="forecast-cards">
        {weather.daily.time.slice(0,7).map((date, index) => (
          <ForecastCard
          key={date}
          date={date}
          temperature={weather.daily.temperature_2m_max[index]}
          weatherCode={weather.daily.weather_code[index]}
        />
        ))}
      </div>
    </section>
  );
}

export default Forecast;