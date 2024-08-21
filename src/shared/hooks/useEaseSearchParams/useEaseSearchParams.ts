import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Упрощенный useSearchParams от react-router-dom.
 * Вместо инстанса URLSearchParams возвращает обычный объект параметров
 * @param initialParams {Object} - Объект параметров
 */
const useEaseSearchParams = <T extends object>
  (initialParams?: never): [T, (val: object, replace?: boolean) => void] => {
  const [params, setParams] = useSearchParams();

  const getParamObj = params
    .toString()
    .split('&')
    .reduce((acc, el) => {
      if (el === '=undefined') {
        return acc;
      }

      acc[String(el.split('=')[0])] = decodeURIComponent(el.split('=')[1]);

      return acc;
    }, {} as any) as T;

  useEffect(() => {
    if (!params.toString() && initialParams) {
      setParams(initialParams);
    }
  }, []);

  /**
   * Переопределить параметры, производит авто очистку пустых полей.
   * @param val {Object} - Объект параметров
   * @param replace {Boolean} - Заменить history
   */
  const handleReset = (val: any, replace?: boolean) => {
    try {
      const newVal = val(getParamObj);
      const keys = Object.keys(val(newVal));
      const clearVal = keys.reduce(
        (acc, el) =>
          newVal[el] ? { ...acc, [el]: decodeURIComponent(decodeURIComponent(newVal[el])) } : acc,
        {}
      );
      if (JSON.stringify(clearVal) !== JSON.stringify(getParamObj)) {
        setParams(clearVal, { replace });
      }
    } catch (e) {
      const keys = Object.keys(val);
      const clearVal = keys.reduce(
        (acc, el) => (val[el] ? { ...acc, [el]: decodeURIComponent(decodeURIComponent(val[el])) } : acc),
        {}
      );
      if (JSON.stringify(clearVal) !== JSON.stringify(getParamObj)) {
        setParams(clearVal, { replace });
      }
    }
  };

  return [getParamObj, handleReset];
};

export { useEaseSearchParams };
