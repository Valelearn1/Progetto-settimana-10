import { useState, useEffect } from "react";

const STORAGE_KEY = "unit";

const useSettings = () => {
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "metric";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, unit);
  }, [unit]);

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return { unit, toggleUnit };
};

export default useSettings;
