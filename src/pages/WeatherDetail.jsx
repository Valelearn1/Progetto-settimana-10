import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCurrentWeather } from "../api/weatherApi";

const WeatherDetail = () => {
  const { city } = useParams();

  // 3 stati: weather (null iniziale), loading (bool), error (null iniziale)
  const [weather, setWeather] = useState(null);
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
        const data = await getCurrentWeather(city);
        setWeather(data);
        // salva data nello stato weather
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

  return (
    <div>
      <h1>{weather.name}</h1>
      <p>{weather.main.temp}°C</p>
      <p>{weather.weather[0].description}</p>
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
