import { useState, useEffect } from "react";
import { getDefaultCity, setDefaultCity as saveDefaultCity } from "../services/userService";

export default function useUserPreferences() {
  const [defaultCity, setDefaultCity] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // new state for errors

  // Fetch default city on mount
  useEffect(() => {
    async function fetchDefault() {
      try {
        const city = await getDefaultCity();
        setDefaultCity(city);
      } catch (err) {
        setError(err.message || "Failed to fetch default city");
      } finally {
        setLoading(false);
      }
    }
    fetchDefault();
  }, []);

  // Set user default city
  const setUserDefaultCity = async (city) => {
    setError(""); // reset previous error
    try {
      const success = await saveDefaultCity(city);
      if (success) {
        setDefaultCity(city);
      } else {
        setError("Failed to save default city");
      }
    } catch (err) {
      setError(err.message || "Failed to save default city");
    }
  };

  return {
    defaultCity,
    setUserDefaultCity,
    loading,
    error, // expose error for UI
  };
}
