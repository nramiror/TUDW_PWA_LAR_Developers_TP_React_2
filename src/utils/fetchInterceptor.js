const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem('boardgames_accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401 || response.status === 403) {
    console.warn("Token expirado, intentando refrescar...");

    try {
      const storedRefreshToken = localStorage.getItem('boardgames_refreshToken');
    
      const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          refreshToken: storedRefreshToken 
        })
      });
      const refreshData = await refreshResponse.json();

      if (refreshResponse.ok) {
        const accessToken = refreshData.data.accessToken || refreshData.accessToken;
        
        localStorage.setItem('boardgames_accessToken', accessToken);
        
        headers['Authorization'] = `Bearer ${accessToken}`;
        return await fetch(url, { ...options, headers });
      } else {
        throw new Error("No se pudo refrescar el token");
      }
    } catch (error) {
      console.error("Sesión finalizada, redirigiendo al login...");
      localStorage.clear();
      window.location.href = '/';
      return response; 
    }
  }

  return response;
};