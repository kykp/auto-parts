import axios from 'axios';
import {parseCookies, setCookie} from "nookies";

// Убедитесь, что URL корректен и включает схему (например, 'http://', 'https://')
// const BASE_URL = 'http://localhost:3000/'
const BASE_URL = 'http://87.228.19.167:3000/'


const $api = axios.create({
  baseURL: BASE_URL,
});

$api.interceptors.request.use(config => {
  const { accessToken } = parseCookies();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  response => response,
  async error => {
    const { response, config } = error;
    if (response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const { refreshToken } = parseCookies();
        const { data } = await axios.post(`${BASE_URL}/auth/refresh-token`, { token: refreshToken });
        const newAccessToken = data.accessToken;

        setCookie(null, 'accessToken', newAccessToken, {
          maxAge: 60 * 15, // 15 минут
          path: '/',
          sameSite: 'Strict',
        });

        $api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return $api(config);
      } catch (err) {
        // Handle refresh token failure, e.g., log out user
        console.error('Failed to refresh token', err);
      }
    }
    return Promise.reject(error);
  }
);

export default $api;
