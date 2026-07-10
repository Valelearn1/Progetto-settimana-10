import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim().length === 0) return;
    navigate(`/weather/${city}`);
  };

  return (
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
  );
};

export default SearchBar;
