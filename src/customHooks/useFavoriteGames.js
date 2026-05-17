import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { matchesInitialLetters } from '../services/boardgames';
import { setToArray } from '../utils/idUtils';
import {
  isValidGame,
  createFavoriteIdSet,
  addFavoriteFlag,
  filterGamesBySearch,
  toggleGameInFavorites,
  syncFavoritesWithVisible,
  findFavoriteGameById,
} from '../utils/favorites/favoriteUtils';

export const useFavoriteGames = (searchQuery = '') => {
  const [favoriteGames, setFavoriteGames] = useLocalStorage('favoriteGames', []);

  const favoriteIdSet = useMemo(
    () => createFavoriteIdSet(favoriteGames),
    [favoriteGames],
  );

  const favoriteIds = useMemo(
    () => setToArray(favoriteIdSet),
    [favoriteIdSet],
  );

  const handleToggleFavorite = useCallback((game) => {
    if (!isValidGame(game)) {
      return;
    }

    setFavoriteGames((prevFavorites) => toggleGameInFavorites(game, prevFavorites));
  }, [setFavoriteGames]);

  const syncFavoriteGames = useCallback((visibleGames) => {
    if (!Array.isArray(visibleGames) || visibleGames.length === 0) {
      return;
    }

    setFavoriteGames((prevFavorites) =>
      syncFavoritesWithVisible(visibleGames, prevFavorites),
    );
  }, [setFavoriteGames]);

  const favoritesWithFlag = useMemo(
    () => addFavoriteFlag(favoriteGames),
    [favoriteGames],
  );

  const filteredFavoritesWithFlag = useMemo(
    () => filterGamesBySearch(favoritesWithFlag, searchQuery, matchesInitialLetters),
    [favoritesWithFlag, searchQuery],
  );

  const handleToggleFavoriteById = useCallback((gameId) => {
    const game = findFavoriteGameById(favoriteGames, gameId);
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
    syncFavoriteGames,
  };
};