import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useFavorites from "../hooks/useFavorites";

const Profile = () => {
  const { username } = useAuth();
  const { favorites } = useFavorites();

  return (
    <div className="profile">
      <h1 className="profile-title">My Profile</h1>
      <p className="profile-username">{username}</p>

      <h2 className="profile-subtitle">
        Favorite cities ({favorites.length})
      </h2>

      {favorites.length === 0 ? (
        <p className="empty-state">
          You haven't saved any favorite cities yet.
        </p>
      ) : (
        <ul className="profile-favorites">
          {favorites.map((city) => (
            <li key={city}>
              <Link to={`/weather/${city}`}>{city}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
