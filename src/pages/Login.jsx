import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length === 0 || password.length === 0) return;

    const result = login(username.trim(), password);

    if (!result.success) {
      setError(result.error);
      return;
    }

    navigate("/");
  };

  return (
    <div className="login">
      <h1 className="login-title">Welcome</h1>
      <p className="login-subtitle">
        Log in or create an account to personalize your experience.
      </p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <p className="login-error">{error}</p>}
        <button className="login-button" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Login;
