import { normalizeGame } from './boardgames';
import { fetchWithAuth } from '../utils/fetchInterceptor';

//const BASE_URL = "https://tudw-pwa-lar-developers-react-games.vercel.app/api";
const BASE_URL = "http://localhost:3001/api";

const getUserId = (userSession) => {
  if (!userSession) return null;
  if (userSession.id) return userSession.id;
  if (userSession.user?.id) return userSession.user.id;
  if (userSession.email?.id) return userSession.email.id;
  if (typeof userSession === 'number' || typeof userSession === 'string') return userSession;
  return null;
};

const handleFetchError = async (res) => {
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
};

export const getFavoritesFromDB = async (language = "es", userSession) => {
  const userId = getUserId(userSession);

  const params = new URLSearchParams({ 
    language,
    ...(userId ? { userId } : {}) 
  });
  
  const res = await fetchWithAuth(`${BASE_URL}/favorites?${params}`);
  await handleFetchError(res);
  
  const responseBody = await res.json();
  const rawFavorites = responseBody.data || []; 

  
  return rawFavorites.map(fav => {
   
    const normalizedGame = normalizeGame(fav.boardgame || {});
    
    return {
      ...normalizedGame,
      favoriteId: fav.id,
      isFavorite: true 
    };
  });
};


export const addFavoriteToDB = async (gameId, userSession) => {
  const userId = getUserId(userSession);

  const res = await fetchWithAuth(`${BASE_URL}/favorites`, {
    method: 'POST',
    body: JSON.stringify({ 
      boardgameId: gameId, 
      userId: userId 
    }) 
  });

  await handleFetchError(res);
  return res.json();
};


export const removeFavoriteFromDB = async (favoriteId) => {
  const res = await fetchWithAuth(`${BASE_URL}/favorites/${favoriteId}`, {
    method: 'DELETE',
  });

  await handleFetchError(res);
  return res.json();
};