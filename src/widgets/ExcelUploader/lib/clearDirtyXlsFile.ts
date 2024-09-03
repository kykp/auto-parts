export const filterAndTrackEmptyValuesFromArrays = (arrays: any[]) => {
  if (arrays.length === 0) {
    return {
      filteredArrays: [],
    };
  }
  // Извлекаем первый массив и остальные массивы
  const [headers, ...dataRows] = arrays;

  // Проверяем первую строку на пустоту и удаляем ее, если она пустая
  const cleanedHeaders = headers && headers.some(cell => cell !== undefined && cell !== '' && cell !== null)
    ? headers
    : dataRows.shift() || []; // Удаляем первую строку если она пустая, и берем следующую строку как заголовок

// Сохраняем индексы ненулевых значений
  const validIndexes = cleanedHeaders
    .map((item, index) => item !== undefined && item !== '' && item !== null ? index : null)
    .filter(index => index !== null);

  // Фильтруем заголовки, оставляя только те, которые есть в validIndexes
  const filteredHeaders = cleanedHeaders.map((item, index) => validIndexes.includes(index) ? item : '');

  // Функция для замены данных по сохраненным индексам
  const filterRowByIndexes = (row) => {
    return validIndexes.map(index => {
      const value = index < row.length ? row[index] : '';
      return value === null || value === undefined ? '' : String(value); // Заменяем null/undefined на пустую строку и приводим к строке
    });
  };

  // Фильтруем все строки данных
  const filteredDataRows = dataRows.map(row => filterRowByIndexes(row));

  return {
    filteredArrays: filteredDataRows,
  };
}
