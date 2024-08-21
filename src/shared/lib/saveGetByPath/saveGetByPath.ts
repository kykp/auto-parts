/**
 * Безопасный подбор значения из объекта (аналог get из lodash)
 * @param value - Объект/Значение
 * @param path - Путь формата "key.key.val"
 * @param defaultValue - Значение предохранитель, если значение по пути достать невозможно
 */
export const saveGetByPath = (value: any, path: any, defaultValue: any): any => {
  if (path.length === 0) return value;

  const newPath = path.split('.');
  const key = newPath.shift();

  return (key && value[key]) ? saveGetByPath(value[key], newPath.join('.'), defaultValue) : defaultValue;
};
