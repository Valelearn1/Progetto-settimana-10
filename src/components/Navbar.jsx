import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    </nav>
  );
};

export default Navbar;
