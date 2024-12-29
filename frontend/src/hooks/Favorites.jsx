import { useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (jobId) => {
    setFavorites(
      favorites.includes(jobId)
        ? favorites.filter((id) => id !== jobId)
        : [...favorites, jobId]
    );
  };

  return { favorites, toggleFavorite };
};
