const BASE_URL = "https://69f34338bd2396bf530fa33e.mockapi.io/api/v1/boardgames";

const normalizeCategory = (category) => {
  if (Array.isArray(category)) {
    return category.join(', ');
  }

  return category ?? '';
};

const normalizeGame = (game) => ({
  ...game,
  title: game.title ?? game.name ?? '',
  category: normalizeCategory(game.category),
});

const matchesInitialLetters = (game, query) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return (
    game.name?.toLowerCase().startsWith(normalizedQuery) ||
    normalizeCategory(game.category).toLowerCase().startsWith(normalizedQuery)
  );
};

export const getBoardGames = async (page = 1, search = "", limit = 5) => {
  const normalizedSearch = search.trim();
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (normalizedSearch) {
    params.set('search', normalizedSearch);
  }

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  const games = await res.json();

  return games
    .filter((game) => matchesInitialLetters(game, normalizedSearch))
    .map(normalizeGame);
};

export const getBoardGameById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const game = await res.json();

  return normalizeGame(game);
};
export const getBoardGameName = async (query) => {
  const res = await fetch(`${BASE_URL}?search=${query}`);
  const games = await res.json();

  return games.map(normalizeGame);
};

export const searchByInitialLetters = async (query) => {
  const res = await fetch(`${BASE_URL}?search=${query}`);
  const games = await res.json();

  return games
    .filter((game) => matchesInitialLetters(game, query))
    .map(normalizeGame);
};

