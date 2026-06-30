//const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "https://tudw-pwa-lar-developers-react-games.vercel.app/api";

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  
  return data;
};

export const registerUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return await response.json();
};