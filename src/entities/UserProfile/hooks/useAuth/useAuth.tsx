import {destroyCookie, parseCookies, setCookie} from 'nookies';
import {useAppDispatch} from "@/shared/hooks/useAppDispatch";
import {profileActions} from "@/entities/UserProfile/model/slices/userProfileSlice.ts";
import {useNavigate} from "react-router-dom";
import {useUserProfile} from "@/entities/UserProfile/hooks/useUserProfile/useUserProfile.ts";
import {useEffect, useState} from "react";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {verifyAccessToken, updateToken} = useUserProfile();

  const cookies = parseCookies();
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  useEffect(() => {
    const checkAuthUser = async () => {
      try {

        if (accessToken) {
          const response = await verifyAccessToken();

          if (response.status === 200) {
            const {user} = response.data;
            dispatch(profileActions.login({isAuth: true, me: {id: String(user.id), email: user.email}}));
            return; // Останавливаем выполнение, если токен валиден
          }
        }

        //Если при перезагрузке старница у нас закончился accessToken но есть refresh
        if (refreshToken) {
          const response = await updateToken(refreshToken);

          if (response.status === 200) {
            const {accessToken, id, email} = response.data;

            setCookie(null, 'accessToken', accessToken, {
              maxAge: 60 * 15, // 15 минут
              path: '/',
              sameSite: 'Strict',
            });

            dispatch(profileActions.login({isAuth: true, me: {id: String(id), email}}));
            return; // Останавливаем выполнение, если обновление токена успешно
          }
        }

        navigate('/login'); // Перенаправляем, если не удалось обновить токен
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/login'); // Перенаправляем в случае ошибки
      } finally {
        setIsLoading(false); // Убираем индикатор загрузки в любом случае
      }
    };

    checkAuthUser();
  }, [accessToken, refreshToken, dispatch, navigate, verifyAccessToken, updateToken]);


  const logOut = () => {
    destroyCookie(null, 'accessToken');
    destroyCookie(null, 'refreshToken');
    dispatch(profileActions.logout());
  };
  return {logOut, isLoading};
};
