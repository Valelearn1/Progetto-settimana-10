import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCurrentWeather, getForecast } from "../api/weatherApi";

const WeatherDetail = () => {
  const { city } = useParams();

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
          getCurrentWeather(city),
          getForecast(city),
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
  }, [city]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // filtrare array: l'API dà una lettura ogni 3 ore per 5 giorni, quindi circa 40 elementi in tutto.
  // Se li mostrassi tutti, l'utente vedrebbe 40 righe invece di "i prossimi 5 giorni".
  // Il .filter() con .includes("12:00:00") serve a scegliere quali elementi tenere:
  // tra le 8 letture di ogni giorno, ne teniamo solo una (quella delle 12:00),
  // così da forecast (40 elementi) ottieni dailyForecast (circa 5 elementi, uno a giorno).
  const dailyForecast = forecast.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  return (
    <div>
      <h1>{weather.name}</h1>
      <p>{weather.main.temp}°C</p>
      <p>{weather.weather[0].description}</p>

      <div>
        {dailyForecast.map((day) => (
          <div key={day.dt}>
            {/* rendering della lista */}
            <p>{day.dt_txt.split(" ")[0]}</p>
            <p>{day.main.temp} °C</p>
            <p>{day.weather[0].description}</p>
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
