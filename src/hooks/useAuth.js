import { useState, useEffect } from "react";

// Login "finto": nessuna password, nessun server — serve solo a
// personalizzare l'interfaccia (es. "Hi, Marco"), non protegge nulla.
const STORAGE_KEY = "username";

const useAuth = () => {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem(STORAGE_KEY);
  });

  useEffect(() => {
    if (username) {
      localStorage.setItem(STORAGE_KEY, username);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [username]);

  const login = (name) => {
    setUsername(name);
  };

  const logout = () => {
    setUsername(null);
  };

  return { username, login, logout, isLoggedIn: Boolean(username) };
};

export default useAuth;
