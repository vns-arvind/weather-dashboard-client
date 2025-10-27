import { useState, useEffect } from "react";
import { fetchWeather } from "../services/weatherService";

export default function useWeather(defaultCity = "") {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(defaultCity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWeather = async (cityName) => {
    if (!cityName) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(cityName);
      setWeather(data);
      setCity(cityName);
    } catch (err) {
      console.warn(`Failed to fetch live data for ${cityName}: ${err.message}`);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(defaultCity);
  }, []);

  return {
    weather,
    city,
    loading,
    error,
    fetchWeather: loadWeather, // expose the fetch for manual search
    setCity,
  };
}
