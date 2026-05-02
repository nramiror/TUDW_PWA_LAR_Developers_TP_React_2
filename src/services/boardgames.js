const BASE_URL = "https://69f34338bd2396bf530fa33e.mockapi.io/api/v1";

export const getBoardGames = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}?page=${page}&limit=5`
  );
  return res.json();
};

export const getBoardGameById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};
export const getBoardGameName = async (query) => {
  const res = await fetch(`${BASE_URL}?search=${query}`);
  return res.json();
};

export const searchByInitialLetters = async (query) => {
  const res = await fetch(`${BASE_URL}?search=${query}`);
  const games = await res.json();
  
  return games.filter(game => 
    game.name?.toLowerCase().startsWith(query.toLowerCase()) ||
    game.category?.toLowerCase().startsWith(query.toLowerCase())
  );
};

export const searchByInitialLettersWithPagination = async (query, page = 1, limit = 5) => {
  const res = await fetch(`${BASE_URL}?page=${page}&limit=${limit}&search=${query}`);
  const games = await res.json();
  
  return games.filter(game =>
    game.name?.toLowerCase().startsWith(query.toLowerCase()) ||
    game.category?.toLowerCase().startsWith(query.toLowerCase())
  );
};