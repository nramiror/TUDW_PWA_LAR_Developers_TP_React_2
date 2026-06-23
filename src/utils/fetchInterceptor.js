export const fetchWithAuth = async (url, options = {}) => {
  
  const token = localStorage.getItem('boardgames_accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    console.error("Token expirado o inválido. El usuario debería desloguearse.");
    localStorage.removeItem('boardgames_accessToken');
    localStorage.removeItem('boardgames_user'); 
    
    window.location.href = '/';
  }

  return response;
};