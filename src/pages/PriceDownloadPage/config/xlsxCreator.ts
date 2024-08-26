import {PriceSchemaMutation} from "@/entities/PriceList/model/types.ts";
import * as XLSX from "xlsx";

export const xlsxCreator = (data: PriceSchemaMutation[], selectedHeaders: string[]) => {
  // Функция для изменения порядка ключей
  const reorderKeys = (data: PriceSchemaMutation[], order: string[]): any[] => {
    return data.map(item => {
      const reorderedItem: any = {};
      order.forEach(key => {
        if (key in item) {
          reorderedItem[key] = item[key];
        }
      });
      return reorderedItem;
    });
  };

  // Преобразование данных с нужным порядком ключей
  const reorderedData = reorderKeys(data, selectedHeaders);

  // Преобразование данных в формат листа
  const worksheet = XLSX.utils.json_to_sheet(reorderedData);

  // Создание новой книги (Workbook)
  const workbook = XLSX.utils.book_new();

  // Добавление листа в книгу
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Генерация Excel файла и его скачивание
  XLSX.writeFile(workbook, 'Data.xlsx');
}
