
const LOCAL_API = process.env.REACT_APP_LOCAL_API_WEATHER_URL || "http://localhost:5290/api/Weather";


export async function fetchWeather(city) {
  if (!city) throw new Error("City name is required");

  try {
    const localUrl = `${LOCAL_API}?city=${encodeURIComponent(city)}`;
    const localResponse = await fetch(localUrl);

    if (localResponse.ok) {
      const localData = await localResponse.json();
      console.info(`Loaded weather from local API: ${city}`);
      return localData;
    } else {
      // Parse error body
      const errorData = await localResponse.json().catch(() => ({}));
      let errorDetail = errorData.detail || `HTTP ${localResponse.status}`;

      // Try to extract inner "message" from JSON in the detail string
      const match = errorDetail.match(/"message":"([^"]+)"/);
      if (match && match[1]) {
        errorDetail = match[1];
      }      

      console.warn(`Local API responded with error: ${errorDetail}, falling back...`);
      throw new Error(errorDetail);
    }
  } catch (localErr) {
    console.warn(`Local API unavailable: ${localErr.message}, falling back to OpenWeatherMap...`);
    throw new Error(localErr.message);
  }
}


