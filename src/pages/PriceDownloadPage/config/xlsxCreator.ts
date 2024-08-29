import {MainPriceSchemaHeaderKeys, PriceSchemaMutation, translations} from "@/entities/PriceList/model/types.ts";
import * as XLSX from "xlsx";

export const xlsxCreator = (data: PriceSchemaMutation[], selectedHeaders: MainPriceSchemaHeaderKeys[]) => {
  // Функция для изменения порядка ключей
  const reorderKeys = (data: PriceSchemaMutation[], order: MainPriceSchemaHeaderKeys[]): any[] => {
    return data.map(item => {
      const reorderedItem: any = {};
      order.forEach(key => {
        if (key in item) {
          if (key === 'article') {
            return reorderedItem[key] = item[key]?.toUpperCase();
          }
          reorderedItem[key] = item[key];

        }
      });
      return reorderedItem;
    });
  };

// Преобразование данных с нужным порядком ключей
  const reorderedData = reorderKeys(data, selectedHeaders);

  // Создание строки заголовков с переводами
  const headerRow = selectedHeaders.reduce((acc, key) => {
    acc[key] = translations[key];
    return acc;
  }, {} as any);

  // Преобразование данных в формат листа, включая заголовки
  const worksheet = XLSX.utils.json_to_sheet([headerRow, ...reorderedData], {
    header: selectedHeaders,
    skipHeader: true // Устанавливаем это, чтобы избежать дублирования заголовков
  });

  // Создание новой книги (Workbook)
  const workbook = XLSX.utils.book_new();

  // Добавление листа в книгу
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Генерация Excel файла и его скачивание
  XLSX.writeFile(workbook, 'Data.xlsx');
}
