export const checkForDuplicates = (arr: string[]): boolean => {
  const result = arr.reduce((acc, item) => {
    if (acc[item]) {
      acc[item] += 1; // Увеличиваем счетчик, если элемент уже встречался
    } else {
      acc[item] = 1; // Инициализируем счетчик, если элемент встречается впервые
    }
    return acc;
  }, {} as Record<string, number>);


  for (const key in result) {
    if (result[key] > 1) {
      return false;
    }
  }

  return true;
};