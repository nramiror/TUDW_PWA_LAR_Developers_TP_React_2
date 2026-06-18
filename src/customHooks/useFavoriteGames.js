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


export const useFavoriteGames = (searchQuery = '', currentLanguage = 'es', userSession = null) => {
 
  const [favoriteGames, setFavoriteGames] = useState([]);
  
 
  useEffect(() => {
    if (!userSession) {
      setFavoriteGames([]);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const apiLanguage = currentLanguage === 'en' ? 'eng' : currentLanguage;
        const data = await getFavoritesFromDB(apiLanguage, userSession);
        setFavoriteGames(data);
      } catch (error) {
        console.error("Error al cargar favoritos desde la base de datos:", error);
      }
    };

    fetchFavorites();
  }, [currentLanguage, userSession]);

  const favoriteIdSet = useMemo(
    () => createFavoriteIdSet(favoriteGames),
    [favoriteGames],
  );

  const favoriteIds = useMemo(
    () => setToArray(favoriteIdSet),
    [favoriteIdSet],
  );

 const handleToggleFavorite = useCallback(async (game) => {
    if (!isValidGame(game) || !userSession) {
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
        const response = await addFavoriteToDB(game.id, userSession);
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
  }, [favoriteGames, userSession]);

 

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