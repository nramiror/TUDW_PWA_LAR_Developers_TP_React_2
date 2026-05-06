/** Crea un Set de IDs de favoritos como strings */
export const createFavoriteIdSet = (favoriteIds) => new Set(favoriteIds.map((id) => String(id)));

/** Enriquece los juegos con el flag de favorito */
export const enrichGamesWithFavorites = (games, favoriteIdSet) =>
  games.map((game) => ({ ...game, isFavorite: favoriteIdSet.has(String(game.id)) }));

/** Encuentra un juego por su ID */
export const findGameById = (games, gameId) =>
  games.find((game) => String(game.id) === String(gameId));

/** Obtiene el mensaje para estado vacío */
export const getEmptyStateMessage = (hasSearchQuery, searchTerm, t) =>
  hasSearchQuery ? t('home.noResultsForSearch', { search: searchTerm }) : t('home.noGames');

/** Determina si debe mostrarse el mensaje de estado vacío */
export const shouldShowEmptyMessage = (games, loading) => games.length === 0 && !loading;

/** Determina si debe mostrarse el loader */
export const shouldShowLoader = (loading, games) => loading && games.length > 0;
