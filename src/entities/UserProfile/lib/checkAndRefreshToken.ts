import {setCookie} from "nookies";
import {refreshAccessToken} from "@/shared/lib/RefreshAccessToken/RefreshAccessToken.ts";

export const checkAndRefreshToken = async () => {
  try {
    const newAccessToken = await refreshAccessToken();

    setCookie(null, 'accessToken', newAccessToken, {
      maxAge: 60 * 15, // 15 минут
      path: '/',
      sameSite: 'Strict',
    });

    return true;
  } catch (error) {
    // Обработка ошибки, если токен не обновляется
    console.error('Error refreshing access token', error);
    return false;
  }
};
