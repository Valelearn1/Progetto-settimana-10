import { useState, useEffect } from "react";

const UNIT_KEY = "unit";
const THEME_KEY = "theme";

const useSettings = () => {
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem(UNIT_KEY) || "metric";
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "default";
  });

  useEffect(() => {
    localStorage.setItem(UNIT_KEY, unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    // Il tema è puramente visivo: applichiamo l'attributo data-theme
    // direttamente sull'elemento <html>. Le variabili CSS definite in
    // index.css (:root e [data-theme="calm"]) fanno il resto — nessun
    // componente deve sapere quale tema è attivo, il CSS si aggiorna
    // da solo appena questo attributo cambia.
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return { unit, setUnit, theme, setTheme };
};

export default useSettings;
