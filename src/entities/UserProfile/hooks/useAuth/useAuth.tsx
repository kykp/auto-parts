import {destroyCookie, parseCookies} from 'nookies';
import {useAppDispatch} from "@/shared/hooks/useAppDispatch";
import {profileActions} from "@/entities/UserProfile/model/slices/userProfileSlice.ts";
import {useNavigate} from "react-router-dom";
import {useUserProfile} from "@/entities/UserProfile/hooks/useUserProfile/useUserProfile.ts";
import {useEffect} from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {verifyAccessToken} = useUserProfile();


  useEffect(() => {

    const checkAuthUser = async () => {
      const cookies = parseCookies();
      const accessToken = cookies.accessToken || '';
      const refreshToken = cookies.refreshToken || '';

      if (accessToken) {
        const response = await verifyAccessToken();
        console.log('response,', response)
      }
    }

    checkAuthUser();

  }, []);

  // useEffect(() => {
  //   const authenticateUser = async () => {
  //     const accessToken = localStorage.getItem('accessToken');
  //     const refreshToken = localStorage.getItem('refreshToken');
  //
  //     if (accessToken) {
  //       // Проверяем, действителен ли accessToken
  //       try {
  //         // Предположим, что есть функция для проверки токена
  //         await verifyAccessToken(accessToken);
  //         dispatch(profileActions.login({ isAuth: true, me: { /* user info */ } }));
  //       } catch (error) {
  //         // Если accessToken недействителен, используем refreshToken
  //         if (refreshToken) {
  //           try {
  //             const response = await fetchNewAccessToken(refreshToken);
  //             localStorage.setItem('accessToken', response.data.accessToken);
  //             dispatch(profileActions.login({ isAuth: true, me: { /* user info */ } }));
  //           } catch (err) {
  //             // Если не удается обновить токен, выходим из системы
  //             dispatch(profileActions.logout());
  //           }
  //         } else {
  //           dispatch(profileActions.logout());
  //         }
  //       }
  //     } else {
  //       dispatch(profileActions.logout());
  //     }
  //   };
  //
  //   authenticateUser();
  // }, []);


  // useEffect(() => {
  //
  //   const cookie = parseCookies();
  //
  //   console.log('cookie', cookie)
  //   if (user) {
  //     const parsedUser = JSON.parse(user);
  //     dispatch(profileActions.login({isAuth: true, me: parsedUser}));
  //   } else {
  //     navigate('/login'); // Redirect to login if not authenticated
  //   }
  // }, []);

  const logOut = () => {
    destroyCookie(null, 'accessToken');
    destroyCookie(null, 'refreshToken');
    dispatch(profileActions.logout());
  };
  return {logOut};
};
