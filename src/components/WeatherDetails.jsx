
function WeatherDetails({weather}) {
  if (!weather){
    return null;
  }

  return (
    <section className="weather-details">
      <div>
        <p>Feels Like</p>
        <h3>{weather.current.apparent_temperature}°C</h3>
      </div>

      <div>
        <p>Humidity</p>
        <h3>{weather.current.relative_humidity_2m}%</h3>
      </div>

      <div>
        <p>Wind</p>
        <h3>{weather.current.wind_speed_10m} km/h</h3>
      </div>
    </section>
  );
}

export default WeatherDetails;