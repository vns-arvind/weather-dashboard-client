export default function WeatherDisplay({ weather }) {
  if (!weather) return <p>No weather data</p>;

  const cityName = weather.name || weather.city;
  const temp = weather.main?.temp || weather.temperatureCelsius;
  const humidity = weather.main?.humidity || weather.humidity;
  const wind = weather.wind?.speed || weather.windSpeed;
  const description = weather.weather?.[0]?.description || weather.weatherDescription;

  return (
    <div>
      <h2>{cityName}</h2>
      <p>Temp: {temp}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind: {wind} km/h</p>
      <p>{description}</p>
    </div>
  );
}
