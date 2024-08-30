import axios from 'axios';
import {parseCookies} from "nookies";

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

export default $api;
