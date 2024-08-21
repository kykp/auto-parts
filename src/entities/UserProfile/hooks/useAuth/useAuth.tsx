import {useEffect, useState} from 'react';
import {destroyCookie, parseCookies} from 'nookies';
import {useNavigate} from 'react-router-dom';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const {accessToken} = parseCookies();

  useEffect(() => {
    if (accessToken) {
      // Проводите проверку действительности токена здесь, если необходимо
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/'); // Перенаправляйте на страницу входа, если нет токена
    }
    setLoading(false);
  }, [accessToken]);

  const logOut = () => {
    // Удаление токенов
    destroyCookie(null, 'accessToken');
    destroyCookie(null, 'refreshToken');
    setIsAuthenticated(false);
  };

  const logIn = () => {
    setIsAuthenticated(true);
  }

  return {isAuthenticated, loading, logOut, logIn};
};
