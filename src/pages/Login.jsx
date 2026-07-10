import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length === 0) return;
    login(name.trim());
    navigate("/");
  };

  return (
    <div className="login">
      <h1 className="login-title">Welcome</h1>
      <p className="login-subtitle">
        Enter your name to personalize your experience.
      </p>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button className="login-button" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Login;
