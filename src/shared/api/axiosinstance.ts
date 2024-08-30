import axios from 'axios';
import {destroyCookie, parseCookies, setCookie} from "nookies";
import { UserProfileService } from "@/entities/UserProfile/api/serivce.ts";

// Убедитесь, что URL корректен и включает схему (например, 'http://', 'https://')
// const BASE_URL = 'http://localhost:3000/'
const BASE_URL = 'http://87.228.19.167:3000/'

const refreshTokenHandler = async () => {
  const { refreshToken } = parseCookies();

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await UserProfileService.updateToken(refreshToken);
  const { token } = response.data;

  setCookie(null, 'accessToken', token, {
    maxAge: 60 * 15, // 15 минут
    path: '/',
    sameSite: 'Strict',
  });

  return token;
};

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

export default $api;
