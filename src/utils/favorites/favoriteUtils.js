import { createIdSetFromObjects } from '../idUtils';

/** Valida si un juego es válido */
export const isValidGame = (game) => Boolean(game && game.id !== undefined && game.id !== null);

/** Crea un Set de IDs de favoritos como strings */
export const createFavoriteIdSet = (favoriteGames) => createIdSetFromObjects(favoriteGames);

/** Enriquece juegos favoritos con flag isFavorite */
export const addFavoriteFlag = (games) =>
  games.map((game) => ({ ...game, isFavorite: true }));

/** Filtra juegos por búsqueda */
export const filterGamesBySearch = (games, searchQuery, matchFn) =>
  games.filter((game) => matchFn(game, searchQuery));

/** Juego en favoritos (agregar o quitar) */
export const toggleGameInFavorites = (game, prevFavorites) => {
  const gameId = String(game.id);
  const exists = prevFavorites.some((fav) => String(fav.id) === gameId);

  if (exists) {
    return prevFavorites.filter((fav) => String(fav.id) !== gameId);
  }

  return [...prevFavorites, { ...game, id: gameId, isFavorite: true }];
};

/** Detecta diferencias entre dos objetos */
export const hasDifferences = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return true;
  }

  return keys1.some((key) => !Object.is(obj1[key], obj2[key]));
};

/** Sincroniza favoritos con juegos visibles (actualiza datos) */
export const syncFavoritesWithVisible = (visibleGames, prevFavorites) => {
  const visibleGamesById = new Map(
    visibleGames.map((game) => [String(game.id), game]),
  );

  let changed = false;
  const nextFavorites = prevFavorites.map((fav) => {
    const updated = visibleGamesById.get(String(fav.id));
    if (!updated) {
      return fav;
    }

    const mergedFavorite = {
      ...fav,
      ...updated,
      id: String(updated.id),
      isFavorite: true,
    };

    if (hasDifferences(mergedFavorite, fav)) {
      changed = true;
      return mergedFavorite;
    }

    return fav;
  });

  return changed ? nextFavorites : prevFavorites;
};

/** Busca un juego favorito por su ID */
export const findFavoriteGameById = (games, gameId) =>
  games.find((fav) => String(fav.id) === String(gameId));
