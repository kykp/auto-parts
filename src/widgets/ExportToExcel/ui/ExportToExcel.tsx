import * as XLSX from 'xlsx';

export const ExportToExcel = () => {
  const handleDownload = () => {
    // Данные для записи в Excel
    const data = [
      { Name: 'John Doe', Age: 30, City: 'New York' },
      { Name: 'Jane Doe', Age: 28, City: 'Chicago' },
      { Name: 'Michael Smith', Age: 35, City: 'San Francisco' }
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
    <button onClick={handleDownload}>
      Скачать Excel файл
    </button>
  );
};
