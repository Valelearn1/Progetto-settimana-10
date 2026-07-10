const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const getCurrentWeather = async (city) => {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  // ${BASE_URL} → inserisce https://api.openweathermap.org/data/2.5/weather
  // ?q= → inizio dei parametri della query, q è il nome del parametro per la città
  // ${encodeURIComponent(city)} → inserisce il nome della città reso "sicuro" per un URL (gestisce spazi, accenti, ecc.)
  // &appid=${API_KEY} → la tua chiave API
  // &units=metric → fisso, per avere Celsius invece di Kelvin

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("City not found");
  }
  const data = await response.json();
  return data;
};

export { getCurrentWeather };
