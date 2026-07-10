import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useRef ci dà un "contenitore" che punta a un elemento del DOM
  // (qui il div del menu a tendina) e che NON causa un re-render quando
  // cambia — a differenza di useState. Lo usiamo solo per poter controllare,
  // dentro l'useEffect qui sotto, se un click è avvenuto dentro o fuori dal menu.
  const menuRef = useRef(null);

  const { username, logout, isLoggedIn } = useAuth();

  useEffect(() => {
    // Questa funzione viene chiamata ogni volta che l'utente clicca
    // in QUALSIASI punto della pagina (non solo sul menu).
    const handleClickOutside = (e) => {
      // menuRef.current è il vero elemento DOM del menu (grazie a ref={menuRef} sotto).
      // .contains(e.target) controlla se l'elemento cliccato (e.target) sta
      // dentro al menu. Se il click è FUORI dal menu, lo chiudiamo.
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    // Registriamo l'ascoltatore di click su tutto il documento (window/document),
    // non solo sul nostro componente — per questo serve "document.addEventListener"
    // e non un semplice onClick su un elemento JSX.
    document.addEventListener("mousedown", handleClickOutside);

    // "return" dentro useEffect è la funzione di CLEANUP: React la esegue
    // quando il componente si smonta (o prima di rieseguire l'effect).
    // Qui rimuoviamo l'ascoltatore per evitare di accumularne uno nuovo
    // ogni volta che il componente si ri-renderizza — altrimenti dopo
    // un po' avremmo decine di listener duplicati tutti attivi insieme.
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // [] = esegui questo effect una sola volta, al montaggio del componente

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

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
          {isSearchOpen && (
            <SearchBar onSearch={() => setIsSearchOpen(false)} />
          )}
          <button
            className="search-icon-button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Toggle search"
          >
            🔍
          </button>
        </div>

        {isLoggedIn ? (
          // ref={menuRef} "collega" questo div al menuRef che abbiamo creato sopra:
          // da questo momento menuRef.current punta esattamente a questo elemento DOM.
          <div className="user-menu" ref={menuRef}>
            <button
              className="user-icon-button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="User menu"
            >
              👤
            </button>
            {isMenuOpen && (
              <div className="user-dropdown">
                <span className="user-dropdown-greeting">Hi, {username}</span>
                <Link
                  to="/profile"
                  className="user-dropdown-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  className="user-dropdown-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  className="user-dropdown-item logout-item"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
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
