import { AxiosError } from 'axios';
import { useState } from 'react';
import $api from '@/shared/api/axiosinstance';

// Интерфейс для опций запроса
interface Options {
  method: 'get' | 'post' | 'put' | 'delete';
}

// Декларация функции useFetch
export const useFetch = <Response, Params extends object = object>(
  url: string,
  options: Options = { method: 'get' }
) => {
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | string | null>(null);

  // Функция запроса
  const query = async (params?: Params): Promise<Response> => {
    setLoading(true);
    setError(null);

    try {
      const response = await $api({
        url,
        method: options.method,
        ...(options.method === 'get' ? { params } : { data: params })
      });

      setData(response.data);
      return response.data;
    } catch (e) {
      // Проверка типа ошибки и установка сообщения
      if (e instanceof AxiosError) {
        setError(e);
        console.error('AxiosError:', e.message);
      } else {
        setError('Неизвестная ошибка');
        console.error('Unknown error:', e);
      }
      // Возвращаем отклоненный промис для обработки ошибок в вызывающем коде
      return Promise.reject(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading: loading,
    query,
  };
};
