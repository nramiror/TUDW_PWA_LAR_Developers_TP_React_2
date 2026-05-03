import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const lastSerializedValueRef = useRef(null);

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return typeof initialValue === 'function' ? initialValue() : initialValue;
      }

      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (error) {
      console.warn(`No se pudo leer localStorage para la clave "${key}":`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const serializedValue = JSON.stringify(storedValue);
      const currentStoredValue = window.localStorage.getItem(key);

      if (
        serializedValue === lastSerializedValueRef.current
        || serializedValue === currentStoredValue
      ) {
        lastSerializedValueRef.current = serializedValue;
        return;
      }

      window.localStorage.setItem(key, serializedValue);
      lastSerializedValueRef.current = serializedValue;
    } catch (error) {
      console.warn(`No se pudo guardar localStorage para la clave "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export const useFavoriteGames = () => {
  const [favoriteGames, setFavoriteGames] = useLocalStorage('favoriteGames', []);

  const favoriteIdSet = useMemo(
    () => new Set(favoriteGames.map((game) => String(game.id))),
    [favoriteGames],
  );

  const favoriteIds = useMemo(() => Array.from(favoriteIdSet), [favoriteIdSet]);

  const handleToggleFavorite = useCallback((game) => {
    if (!game || game.id === undefined || game.id === null) {
      return;
    }

    const gameId = String(game.id);

    setFavoriteGames((prevFavorites) => {
      const exists = prevFavorites.some((fav) => String(fav.id) === gameId);

      if (exists) {
        return prevFavorites.filter((fav) => String(fav.id) !== gameId);
      }

      return [...prevFavorites, { ...game, id: gameId, isFavorite: true }];
    });
  }, [setFavoriteGames]);

  const syncFavoriteGames = useCallback((visibleGames) => {
    if (!Array.isArray(visibleGames) || visibleGames.length === 0) {
      return;
    }

    setFavoriteGames((prevFavorites) => {
      const visibleGamesById = new Map(
        visibleGames.map((game) => [String(game.id), game]),
      );

      let changed = false;
      const nextFavorites = prevFavorites.map((fav) => {
        const updated = visibleGamesById.get(String(fav.id));
        if (!updated) {
          return fav;
        }

        const mergedFavorite = { ...fav, ...updated, id: String(updated.id), isFavorite: true };
        const mergedKeys = Object.keys(mergedFavorite);
        const hasDifferences = mergedKeys.length !== Object.keys(fav).length
          || mergedKeys.some((key) => !Object.is(mergedFavorite[key], fav[key]));

        if (!hasDifferences) {
          return fav;
        }

        changed = true;
        return mergedFavorite;
      });

      return changed ? nextFavorites : prevFavorites;
    });
  }, [setFavoriteGames]);

  const favoritesWithFlag = useMemo(
    () => favoriteGames.map((game) => ({ ...game, isFavorite: true })),
    [favoriteGames],
  );

  const handleToggleFavoriteById = useCallback((gameId) => {
    const game = favoriteGames.find((fav) => String(fav.id) === String(gameId));
    if (game) {
      handleToggleFavorite(game);
    }
  }, [favoriteGames, handleToggleFavorite]);

  return {
    favoriteGames,
    favoriteIds,
    favoritesWithFlag,
    handleToggleFavorite,
    handleToggleFavoriteById,
    syncFavoriteGames,
  };
};
