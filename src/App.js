import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import DefaultLocation from "./components/DefaultLocation";
import useWeather from "./hooks/useWeather";
import useUserPreferences from "./hooks/useUserPreferences";
import './App.css';

export default function App() {
  const {
    defaultCity,
    setUserDefaultCity,
    loading: userLoading,
    error: userError
  } = useUserPreferences();

  const {
    weather,
    city,
    loading: weatherLoading,
    error: weatherError,
    fetchWeather
  } = useWeather();

  const [currentCity, setCurrentCity] = useState("");

  // When default city is loaded, set current city and fetch weather
  useEffect(() => {
    if (!userLoading && defaultCity) {
      setCurrentCity(defaultCity);
      fetchWeather(defaultCity);
    }
  }, [userLoading, defaultCity]);

  const handleSearch = (cityName) => {
    setCurrentCity(cityName);
    fetchWeather(cityName);
  };

  const handleSetDefault = async () => {
    await setUserDefaultCity(currentCity);
  };

  return (
    <div className="App app-container">
      <h1>Weather Dashboard</h1>

      {userError && (
        <div className="error">Error loading user preferences: {userError}</div>
      )}

      <div className="search-container">
        <SearchBar onSearch={handleSearch} />
        {weatherError && <div className="search-error">{weatherError}</div>}
      </div>

      <WeatherDisplay weather={weather} loading={weatherLoading} error={weatherError} />

      <DefaultLocation city={defaultCity} onSetDefault={handleSetDefault} />
    </div>
  );
}
