import axios from 'axios';
import {destroyCookie, parseCookies, setCookie} from "nookies";
import {UserProfileService} from "@/entities/UserProfile/api/serivce.ts";

// Убедитесь, что URL корректен и включает схему (например, 'http://', 'https://')
// const BASE_URL = 'http://localhost:3000/'
const BASE_URL = 'http://87.228.19.167:3000/'

const $api = axios.create({
  baseURL: BASE_URL,
});

$api.interceptors.request.use(config => {
  const {accessToken} = parseCookies();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});


// Интерсептор для обработки ответов
$api.interceptors.response.use(
  (response) => response, // Успешный ответ
  async (error) => {
    const originalRequest = error.config;
    const {refreshToken} = parseCookies();

    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const {status, data} = await UserProfileService.updateToken(refreshToken);

        if (status === 200) {
          setCookie(null, 'accessToken', data.accessToken, {
            maxAge: 60 * 15, // 15 минут
            path: '/',
            sameSite: 'Strict',
          });

          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
          return $api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Не удалось обновить токен', refreshError);
      }
    }

    destroyCookie(null, 'accessToken');
    destroyCookie(null, 'refreshToken');
    return Promise.reject(error);
  }
);

export default $api;
