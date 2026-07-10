import { useState, useEffect } from "react";

const STORAGE_KEY = "favoriteCities";

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city) => {
    setFavorites((prev) => {
      if (prev.includes(city)) return prev;
      return [...prev, city];
    });
  };

  const removeFavorite = (city) => {
    setFavorites((prev) => prev.filter((c) => c !== city));
  };

  const isFavorite = (city) => favorites.includes(city);

  return { favorites, addFavorite, removeFavorite, isFavorite };
};

export default useFavorites;
