import { useState, useEffect } from "react";

// Login "finto": tutto salvato in chiaro nel localStorage del browser,
// nessun server, nessuna crittografia. Simula un flusso di login/
// registrazione solo per la UI — NON è un pattern sicuro da riusare
// per dati reali.
const USERS_KEY = "users";
const SESSION_KEY = "currentUser";

const useAuth = () => {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem(SESSION_KEY);
  });

  useEffect(() => {
    if (username) {
      localStorage.setItem(SESSION_KEY, username);
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [username]);

  const getUsers = () => {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : {};
  };

  const login = (name, password) => {
    const users = getUsers();

    if (!users[name]) {
      // primo accesso con questo username: lo registriamo al volo
      users[name] = password;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      setUsername(name);
      return { success: true };
    }

    if (users[name] !== password) {
      return { success: false, error: "Incorrect password" };
    }

    setUsername(name);
    return { success: true };
  };

  const logout = () => {
    setUsername(null);
  };

  return { username, login, logout, isLoggedIn: Boolean(username) };
};

export default useAuth;
