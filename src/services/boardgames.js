const BASE_URL = "https://69f34338bd2396bf530fa33e.mockapi.io/api/v1/boardgames";

const fetchJson = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    let details = "";

    try {
      details = await res.text();
    } catch {
      details = "";
    }

    const suffix = details ? `: ${details}` : "";
    throw new Error(`API request failed (${res.status} ${res.statusText})${suffix}`);
  }

  return res.json();
};

const normalizeCategory = (category) => {
  if (Array.isArray(category)) {
    return category.join(', ');
  }

  return category ?? '';
};

const normalizeGame = (game) => ({
  ...game,
  name: game.name,
  category: normalizeCategory(game.category),
});

export const matchesInitialLetters = (game, query) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return (
    game.name?.toLowerCase().startsWith(normalizedQuery) ||
    normalizeCategory(game.category).toLowerCase().startsWith(normalizedQuery)
  );
};

export const getBoardGames = async (page = 1, search = "", limit = 5, signal) => {
  const normalizedSearch = search.trim();
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (normalizedSearch) {
    params.set('search', normalizedSearch);
  }

  const res = await fetch(`${BASE_URL}?${params.toString()}`, signal ? { signal } : undefined);
  const games = await res.json();

  return games
    .filter((game) => matchesInitialLetters(game, normalizedSearch))
    .map(normalizeGame);
};

export const getBoardGameById = async (id) => {
  const game = await fetchJson(`${BASE_URL}/${id}`);

  return normalizeGame(game);
};
export const getBoardGameName = async (query) => {
  const games = await fetchJson(`${BASE_URL}?search=${query}`);

  return games.map(normalizeGame);
};
