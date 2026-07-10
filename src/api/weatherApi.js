const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

const getCurrentWeather = async (city, unit = "metric") => {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`;
  // ${BASE_URL} → inserisce https://api.openweathermap.org/data/2.5/weather
  // ?q= → inizio dei parametri della query, q è il nome del parametro per la città
  // ${encodeURIComponent(city)} → inserisce il nome della città reso "sicuro" per un URL (gestisce spazi, accenti, ecc.)
  // &appid=${API_KEY} → la tua chiave API
  // &units= → "metric" per Celsius, "imperial" per Fahrenheit

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("City not found");
  }
  const data = await response.json();
  return data;
};

const getForecast = async (city, unit = "metric") => {
  const url = `${FORECAST_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Forecast not found");
  }
  const data = await response.json();
  return data;
};

// Stesso endpoint di getCurrentWeather, ma cerca per coordinate (lat/lon)
// invece che per nome città — ci serve per "use my location". La risposta
// include comunque "name", quindi possiamo risalire al nome della città.
const getCurrentWeatherByCoords = async (lat, lon, unit = "metric") => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Location not found");
  }
  const data = await response.json();
  return data;
};

// Geocoding "diretto": da un testo parziale (es. "Lon") restituisce una
// lista di città che matchano, con nome/stato/paese — la usiamo per i
// suggerimenti di ricerca mentre l'utente digita.
const searchCities = async (query) => {
  const url = `${GEO_URL}?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Search failed");
  }
  const data = await response.json();
  return data;
};

export {
  getCurrentWeather,
  getForecast,
  getCurrentWeatherByCoords,
  searchCities,
};
