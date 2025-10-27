import { parseApiError } from "../utils/apiError";

const USER_API = process.env.REACT_APP_LOCAL_API_USER_URL || "http://localhost:5290/api/user-preferences";
const USER_ID = process.env.REACT_APP_USER_ID || "varvinp";

/**
 * Get the default city for the current user
 */
export async function getDefaultCity() {
  try {
    const res = await fetch(`${USER_API}/${USER_ID}`);
    if (!res.ok) {
      const errBody = await res.json();
      throw new Error(parseApiError(errBody));
    }
    const data = await res.json();
    return data.city;
  } catch (err) {
    console.error("Failed to fetch default city:", err.message);
    // fallback default
    return "London";
  }
}

/**
 * Save the default city for the current user
 */
export async function setDefaultCity(city) {
  try {
    if (!city) city = "London"; // default fallback
    const res = await fetch(`${USER_API}/set-default-location`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: USER_ID, city }),
    });

    if (!res.ok) {
      const errBody = await res.json();
      throw new Error(parseApiError(errBody));
    }

    return true;
  } catch (err) {
    console.error("Failed to set default city:", err.message);
    return false;
  }
}
