import {setCookie} from "nookies";

export const storeTokens = (accessToken: string, refreshToken: string) => {
  setCookie(null, 'accessToken', accessToken, {
    maxAge: 60 * 15, // 15 минут
    path: '/',
    sameSite: 'Strict',
  });

  setCookie(null, 'refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 7, // 7 дней
    path: '/',
    sameSite: 'Strict',
  });
};
