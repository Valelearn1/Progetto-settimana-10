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
    <form onSubmit={handleSubmit}>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search a city..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
