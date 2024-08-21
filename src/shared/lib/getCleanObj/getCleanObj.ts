export const getCleanObj = <T extends object>(obj: T): Partial<T> => {
  return Object.entries(obj).reduce<Partial<T>>((acc, [key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      acc[key as keyof T] = val;
    }
    return acc;
  }, {});
};
