export const filterBy = <T extends object = object,>(
  list: T[],
  key: keyof T,
  search: string
): T[] => {
  if (!search) {
    return list;
  }

  return list.reduce((acc, cur) => {
    const value = cur[key as keyof typeof cur];
    if (value !== undefined && value !== null && typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())) {
      acc.push(cur);
    } else {
      console.log('Skipping item:', cur);
    }

    return acc;
  }, [] as T[]);
};