import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchCities } from "../api/weatherApi";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim().length === 0) return;
    navigate(`/weather/${city}`);
    setCity("");
    setSuggestions([]);
    onSearch?.();
  };

  const handleSelect = (name) => {
    navigate(`/weather/${name}`);
    setCity("");
    setSuggestions([]);
    onSearch?.();
  };

  // Debounce: se cercassimo le città ad ogni singolo tasto premuto, faremmo
  // una richiesta di rete per ogni lettera digitata ("L", "Lo", "Lon", ...),
  // sovraccaricando inutilmente l'API. Con il debounce aspettiamo che
  // l'utente smetta di digitare per un attimo (400ms) prima di cercare davvero.
  useEffect(() => {
    if (city.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchCities(city);
        setSuggestions(results);
      } catch {
        setSuggestions([]);
      }
    }, 400);

    // Cleanup: se l'utente digita un'altra lettera prima che passino i 400ms,
    // questo timeout viene annullato e ne parte uno nuovo — così la ricerca
    // scatta solo quando l'utente si "ferma" davvero per un momento.
    return () => clearTimeout(timeoutId);
  }, [city]);

  return (
    <div className="search-bar-wrapper">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          className="search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search a city..."
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map((place) => (
            <li key={`${place.lat}-${place.lon}`}>
              <button type="button" onClick={() => handleSelect(place.name)}>
                {place.name}
                {place.state ? `, ${place.state}` : ""}, {place.country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
