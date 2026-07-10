import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";
import useSettings from "../hooks/useSettings";
import getCityIcon from "../utils/cityIcons";
import { getCurrentWeatherByCoords } from "../api/weatherApi";

// Un piccolo saluto in base all'ora del giorno, usato solo nel tema calm
// (vedi l'eyebrow "Good evening" nel rendering di riferimento).
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const Home = () => {
  const { favorites } = useFavorites();
  const { theme } = useSettings();
  const isCalm = theme === "calm";
  const navigate = useNavigate();
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      // successo: riceviamo le coordinate dal browser
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getCurrentWeatherByCoords(latitude, longitude);
          navigate(`/weather/${data.name}`);
        } catch (err) {
          setLocationError(err.message);
        } finally {
          setIsLocating(false);
        }
      },
      // errore: es. utente ha negato il permesso
      () => {
        setLocationError("Unable to retrieve your location.");
        setIsLocating(false);
      },
    );
  };

  return (
    <div className="home">
      {isCalm && <p className="eyebrow">{getGreeting()}</p>}
      <h1 className="home-title">
        {isCalm ? "Your favorite skies" : "Your Favorite Cities"}
      </h1>
      {isCalm && (
        <p className="home-subtitle">
          A quieter way to check in on the places you love, and the sky
          above wherever you are right now.
        </p>
      )}

      <button
        className="location-button"
        onClick={handleUseLocation}
        disabled={isLocating}
      >
        📍 {isLocating ? "Locating..." : "Use my location"}
      </button>
      {locationError && <p className="login-error">{locationError}</p>}

      {favorites.length === 0 ? (
        <p className="empty-state">
          No favorites yet — search a city and tap the star to save it here.
        </p>
      ) : (
        <div className="favorites-list">
          {favorites.map((city) => (
            <Link
              key={city}
              to={`/weather/${city}`}
              className="favorite-card"
            >
              <div className="favorite-card-inner">
                <div className="favorite-card-front">
                  <span className="favorite-card-icon">
                    {getCityIcon(city)}
                  </span>
                  <span>{city}</span>
                </div>
                <div className="favorite-card-back">View weather →</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
