import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";
import getCityIcon from "../utils/cityIcons";

const Home = () => {
  const { favorites } = useFavorites();

  return (
    <div className="home">
      <h1 className="home-title">Your Favorite Cities</h1>

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
