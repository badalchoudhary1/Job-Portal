import { createSignal } from "solid-js";

export const useFavorites = () => {
  const [favorites, setFavorites] = createSignal([]);

  const toggleFavorite = (jobId) => {
    setFavorites(
      favorites().includes(jobId)
        ? favorites().filter((id) => id !== jobId)
        : [...favorites(), jobId]
    );
  };

  return { favorites, toggleFavorite };
};
