import { createContext, useState, useEffect, useContext } from 'react';
import Loader from '../Components/Loader/Loader';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem('boardgames_accessToken');
    const storedUser = localStorage.getItem('boardgames_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser)); 
    }
    setIsLoading(false); 
  }, []);

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    
    localStorage.setItem('boardgames_accessToken', accessToken);
    localStorage.setItem('boardgames_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    
    localStorage.removeItem('boardgames_accessToken');
    localStorage.removeItem('boardgames_user');
  };

  if (isLoading) {
    return <Loader />; 
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};