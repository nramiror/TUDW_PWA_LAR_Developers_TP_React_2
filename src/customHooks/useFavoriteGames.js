import { useState, useEffect, useCallback, useMemo } from 'react';
import { matchesInitialLetters } from '../services/boardgames';
import { getFavoritesFromDB, addFavoriteToDB, removeFavoriteFromDB } from '../services/favorites';
import { setToArray } from '../utils/id/idUtils';
import {
  isValidGame,
  createFavoriteIdSet,
  addFavoriteFlag,
  filterGamesBySearch,
} from '../utils/favorites/favoriteUtils';
import { useAuth } from '../context/AuthContext';


export const useFavoriteGames = (searchQuery = '', currentLanguage = 'es') => {
  
  const { user } = useAuth();
  const [favoriteGames, setFavoriteGames] = useState([]);
 
  useEffect(() => {
    if (!user) {
      setFavoriteGames([]);
      return;
    }
    const fetchFavorites = async () => {
      try {
        const apiLanguage = currentLanguage === 'en' ? 'eng' : currentLanguage;
        const data = await getFavoritesFromDB(apiLanguage, user);
        setFavoriteGames(data);
      } catch (error) {
        console.error("Error al cargar favoritos desde la base de datos:", error);
      }
    };

    fetchFavorites();
  }, [currentLanguage, user]);

  const favoriteIdSet = useMemo(
    () => createFavoriteIdSet(favoriteGames),
    [favoriteGames],
  );

  const favoriteIds = useMemo(
    () => setToArray(favoriteIdSet),
    [favoriteIdSet],
  );

 const handleToggleFavorite = useCallback(async (game) => {
    if (!isValidGame(game) || !user) {
      return;
    }
    const existingFavorite = favoriteGames.find((g) => g.id === game.id);
    const isAlreadyFavorite = !!existingFavorite;

    setFavoriteGames((prevFavorites) =>
      isAlreadyFavorite
        ? prevFavorites.filter((g) => g.id !== game.id)
        : [...prevFavorites, game]
    );

    try {
      if (isAlreadyFavorite) {
        await removeFavoriteFromDB(existingFavorite.favoriteId);
      } else {
        const response = await addFavoriteToDB(game.id, user);
        setFavoriteGames((prevFavorites) =>
          prevFavorites.map((g) =>
            g.id === game.id ? { ...g, favoriteId: response.data?.id } : g
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar la base de datos. Revirtiendo cambio...", error);
      setFavoriteGames((prevFavorites) =>
        isAlreadyFavorite
          ? [...prevFavorites, game]
          : prevFavorites.filter((g) => g.id !== game.id)
      );
    }
  }, [favoriteGames, user]);

 

  const favoritesWithFlag = useMemo(
    () => addFavoriteFlag(favoriteGames),
    [favoriteGames],
  );

  const filteredFavoritesWithFlag = useMemo(
    () => filterGamesBySearch(favoritesWithFlag, searchQuery, matchesInitialLetters),
    [favoritesWithFlag, searchQuery],
  );

  const handleToggleFavoriteById = useCallback((gameId) => {
    const game = favoriteGames.find((g) => g.id === gameId);
    if (game) {
      handleToggleFavorite(game);
    }
  }, [favoriteGames, handleToggleFavorite]);

  return {
    favoriteGames,
    favoriteIds,
    favoritesWithFlag,
    filteredFavoritesWithFlag,
    handleToggleFavorite,
    handleToggleFavoriteById,
  };
};