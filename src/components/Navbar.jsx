import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { username, logout, isLoggedIn } = useAuth();

  return (
    <nav className="navbar">
      {!isHome && (
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back
        </button>
      )}
      <Link to="/" className="navbar-brand">
        Breezy
      </Link>

      <div className="navbar-right">
        <div className="navbar-search">
          {isSearchOpen && <SearchBar />}
          <button
            className="search-icon-button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Toggle search"
          >
            🔍
          </button>
        </div>

        {isLoggedIn ? (
          <div className="navbar-user">
            <span className="navbar-greeting">Hi, {username}</span>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="navbar-login-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
