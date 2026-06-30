import { fetchWithAuth } from '../utils/fetchInterceptor';
//const BASE_URL = import.meta.env.VITE_BASE_URL;
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

export const normalizeCategory = (category) => {
  if (Array.isArray(category)) {
    return category.join(', ');
  }

  return category ?? '';
};


export const normalizeGame = (game) => {
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

  if (normalizedSearch) {
    const params = new URLSearchParams({
      query: normalizedSearch, 
      language: language,
    });

    const res = await fetch(`${BASE_URL}/boardgames/search?${params}`, { signal });
    const responseBody = await res.json();

    const gamesArray = responseBody.data || [];

    return gamesArray.map(normalizeGame);
  }

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


export const deleteBoardGameFromDB = async (id) => {
  const response = await fetchWithAuth(`${BASE_URL}/boardgames/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error("Error al borrar el juego");
  }
  return response.json(); 
};


export const updateBoardGameInDB = async (id, gameData) => {
  const response = await fetchWithAuth(`${BASE_URL}/boardgames/${id}`, {
    method: 'PUT', 
    body: JSON.stringify(gameData)
  });
  
  if (!response.ok) {
    
    let errorDetail = "Error desconocido";
    try {
      const errorResponse = await response.json();

      errorDetail = errorResponse.message || errorResponse.error || JSON.stringify(errorResponse);
    } catch (e) {
      console.error("No se pudo leer el JSON del error");
    }
    throw new Error(`Error del backend: ${errorDetail}`);
  }
  
  return response.json();
};

export const createBoardGameInDB = async (gameData) => {
  const response = await fetchWithAuth(`${BASE_URL}/boardgames`, {
    method: 'POST',
    body: JSON.stringify(gameData)
  });
  return response.json();
};