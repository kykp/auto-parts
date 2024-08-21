import $api from "@/shared/api/axiosinstance.ts";

export const refreshAccessToken = async () => {
  try {
    const response = await $api.post('/auth/refresh-token', {
      refreshToken: getCookie('refreshToken'), // Функция для получения куки
    });

    return response.data.accessToken;
  } catch (error) {
    console.error('Ошибка обновления токена', error);
    throw new Error('Не удалось обновить токен');
  }
};

// Функция для получения куки по имени
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};
