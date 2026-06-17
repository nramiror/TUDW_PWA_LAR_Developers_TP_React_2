const BASE_URL = "https://tudw-pwa-lar-developers-react-games.vercel.app/api";

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


const normalizeGame = (game) => {
  const translation = game.translation || {};
  return {
    ...game,
    name: translation.name || "Nombre no disponible",
    image: game.imageURL || game.image,
    category: normalizeCategory(translation.category),
    description: translation.description || "", // Traemos también la descripción traducida
  };
};

export const matchesInitialLetters = (game, query) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const translation = game.translation || {};
  const name = translation.name || "";
  const category = normalizeCategory(translation.category) || "";

  return (
    name.toLowerCase().startsWith(normalizedQuery) ||
    category.toLowerCase().startsWith(normalizedQuery)
  );
};

export const getBoardGames = async (page = 1, search = "", limit = 5, language = "es", signal) => {
  const normalizedSearch = search.trim();

  // CASO A: Si el usuario escribió algo en el buscador, usamos el endpoint de búsqueda del Back
  if (normalizedSearch) {
    const params = new URLSearchParams({
      query: normalizedSearch, // <-- ¡Acá usamos 'query' que es lo que espera tu controlador!
      language: language,
    });

    // IMPORTANTE: Asegurate de mapear la URL exacta de tu router del backend para búsquedas.
    // Si tu router de búsquedas usa la ruta base con otro endpoint (ej: /boardgames/search o similar), 
    // cambialo acá. Si usa la misma base, recordá pasarle el parámetro '?query='
    const res = await fetch(`${BASE_URL}/boardgames/search?${params}`, { signal });
    const responseBody = await res.json();

    // Como tu getBoardgameByQueryController devuelve { success: true, data: [...] }
    const gamesArray = responseBody.data || [];

    // Retornamos mapeando los juegos directamente (ya vienen filtrados por el query nativo del backend)
    return gamesArray.map(normalizeGame);
  }

  // CASO B: Si el buscador está vacío, funciona la paginación normal del Home (Ruta por defecto)
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    language: language,
  });

  const res = await fetch(`${BASE_URL}/boardgames?${params}`, { signal });
  const responseBody = await res.json();
  const gamesArray = responseBody.data || [];

  return gamesArray.map(normalizeGame);
};

export const getBoardGameById = async (id, language = "es") => {
  const params = new URLSearchParams({ language });

  const res = await fetch(`${BASE_URL}/boardgames/${id}?${params}`);

  if (!res.ok) {
    throw new Error(`Error ${res.status}: Resource not found`);
  }

  const responseBody = await res.json();
  const gameData = responseBody.data || {};

  return normalizeGame(gameData);
};

export const getBoardGameName = async (query) => {
  const games = await fetchJson(`${BASE_URL}/boardgames?search=${query}`);

  return games.map(normalizeGame);
};
