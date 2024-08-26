import * as XLSX from 'xlsx';
import {PriceSchemaMutation} from "@/entities/PriceList/model/types.ts";
import {Button} from "@/shared/ui/Button";

interface ExportToExcelProps {
  data: PriceSchemaMutation
}

export const ExportToExcel = (props: ExportToExcelProps) => {
  const {data} = props;

  const handleDownload = () => {
    // Данные для записи в Excel
    const data = [
      {Name: 'John Doe', Age: 30, City: 'New York'},
      {Name: 'Jane Doe', Age: 28, City: 'Chicago'},
      {Name: 'Michael Smith', Age: 35, City: 'San Francisco'}
    ];

    // Преобразование данных в формат листа
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Создание новой книги (Workbook)
    const workbook = XLSX.utils.book_new();

    // Добавление листа в книгу
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Генерация Excel файла и его скачивание
    XLSX.writeFile(workbook, 'Data.xlsx');
  };

  return (
    <Button theme='primary' type='submit' onClick={handleDownload}>Download</Button>
  );
};
