import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

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
    </nav>
  );
};

export default Navbar;
