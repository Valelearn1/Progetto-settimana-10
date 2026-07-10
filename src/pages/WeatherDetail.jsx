import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCurrentWeather, getForecast } from "../api/weatherApi";
import useFavorites from "../hooks/useFavorites";
import useSettings from "../hooks/useSettings";
import getWeatherBackground from "../utils/weatherBackgrounds";

const WeatherDetail = () => {
  const { city } = useParams();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { unit } = useSettings();
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  // 3 stati: weather (null iniziale), loading (bool), error (null iniziale)
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  // dato che la fetch parte subito al montaggio del componente,
  // conviene partire già in stato "loading" per evitare
  // quell'istante in cui loading è falso ma weather è ancora null.
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      (setLoading(true), setError(null));
      // reset prima di ogni chiamata

      try {
        const [currentData, forecastData] = await Promise.all([
          getCurrentWeather(city, unit),
          getForecast(city, unit),
        ]);

        setWeather(currentData);
        setForecast(forecastData.list);
        // salva data nello stato weather
        // il campo "list" è l'array con le previsioni ogni 3 ore
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, unit]);

  if (loading) {
    return (
      <div className="weather-detail">
        <div className="skeleton skeleton-hero" />
        <div className="skeleton-stats">
          <div className="skeleton skeleton-stat" />
          <div className="skeleton skeleton-stat" />
          <div className="skeleton skeleton-stat" />
        </div>
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line" />
      </div>
    );
  }

  if (error) {
    return <p className="status-message error-message">{error}</p>;
  }

  // filtrare array: l'API dà una lettura ogni 3 ore per 5 giorni, quindi circa 40 elementi in tutto.
  // Se li mostrassi tutti, l'utente vedrebbe 40 righe invece di "i prossimi 5 giorni".
  // Il .filter() con .includes("12:00:00") serve a scegliere quali elementi tenere:
  // tra le 8 letture di ogni giorno, ne teniamo solo una (quella delle 12:00),
  // così da forecast (40 elementi) ottieni dailyForecast (circa 5 elementi, uno a giorno).
  const dailyForecast = forecast.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  // l'API restituisce la data in formato ISO "YYYY-MM-DD" (ordine US-like);
  // qui la riordiniamo in formato europeo "DD/MM/YYYY".
  const formatDate = (isoDate) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  // sunrise/sunset arrivano come timestamp Unix (secondi dal 1/1/1970).
  // Date vuole i millisecondi, quindi moltiplichiamo per 1000.
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const favorite = isFavorite(weather.name);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(weather.name);
    } else {
      addFavorite(weather.name);
    }
  };

  return (
    <div className="weather-detail">
      <div
        className="current-weather"
        style={{ background: getWeatherBackground(weather.weather[0].main) }}
      >
        <button
          className="favorite-button"
          onClick={toggleFavorite}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "★" : "☆"}
        </button>
        <h1 className="city-name">{weather.name}</h1>
        <p className="current-temp">
          {Math.round(weather.main.temp)}
          {unitSymbol}
        </p>
        <p className="current-description">
          {weather.weather[0].description}
        </p>
      </div>

      <div className="weather-stats">
        <div className="weather-stat">
          <span className="weather-stat-label">Humidity</span>
          <span className="weather-stat-value">{weather.main.humidity}%</span>
        </div>
        <div className="weather-stat">
          <span className="weather-stat-label">Wind</span>
          <span className="weather-stat-value">
            {/* l'API restituisce il vento in m/s con "metric", lo convertiamo
            in km/h (1 m/s = 3.6 km/h); con "imperial" arriva già in mph */}
            {unit === "metric"
              ? `${Math.round(weather.wind.speed * 3.6)} km/h`
              : `${Math.round(weather.wind.speed)} mph`}
          </span>
        </div>
        <div className="weather-stat">
          <span className="weather-stat-label">Feels like</span>
          <span className="weather-stat-value">
            {Math.round(weather.main.feels_like)}
            {unitSymbol}
          </span>
        </div>
        <div className="weather-stat">
          <span className="weather-stat-label">Sunrise</span>
          <span className="weather-stat-value">
            {formatTime(weather.sys.sunrise)}
          </span>
        </div>
        <div className="weather-stat">
          <span className="weather-stat-label">Sunset</span>
          <span className="weather-stat-value">
            {formatTime(weather.sys.sunset)}
          </span>
        </div>
      </div>

      <div className="forecast-list">
        {dailyForecast.map((day) => (
          <div className="forecast-day" key={day.dt}>
            {/* rendering della lista */}
            <p className="forecast-date">
              {formatDate(day.dt_txt.split(" ")[0])}
            </p>
            <p className="forecast-temp">
              {Math.round(day.main.temp)}
              {unitSymbol}
            </p>
            <p className="forecast-description">
              {day.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetail;

// Commento per me:
// Come funziona nel dettaglio: React chiama la funzione WeatherDetail
// ogni volta che c'è un render. La prima volta, loading è true → la funzione
// esegue il primo if, ritorna <p>Loading...</p> e si ferma lì
// (le righe sotto non vengono eseguite).
// Quando la fetch finisce, setLoading(false) fa scattare un nuovo render:
// stavolta il primo if è falso, si passa al secondo — se c'è un errore lo mostra
// e si ferma; altrimenti arriva in fondo, dove ormai è garantito
// che weather contenga i dati veri.
