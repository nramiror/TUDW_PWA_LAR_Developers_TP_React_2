const BASE_URL = "https://69f34338bd2396bf530fa33e.mockapi.io/api/v1";

export const getBoardGames = async (page = 1, search = "") => {
  const res = await fetch(
    `${BASE_URL}?page=${page}&limit=5&search=${search}`
  );
  return res.json();
};

export const getBoardGameById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};