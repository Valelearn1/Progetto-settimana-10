import { useState, useEffect } from "react";

const STORAGE_KEY = "unit";

const useSettings = () => {
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "metric";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, unit);
  }, [unit]);

  return { unit, setUnit };
};

export default useSettings;
