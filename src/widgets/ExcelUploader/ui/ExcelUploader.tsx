import {ChangeEvent, useState} from 'react';
import * as XLSX from 'xlsx';
import {lang} from "@/shared/consts/lang.ts";
import {Select} from "@/shared/ui/Field/Select";
import {createSelectOptions,} from "@/entities/PriceList/model/types.ts";
import cls from './ExcelUploader.module.scss';
import {SelectOptions} from "@/app/types/types.ts";
import {Button} from "@/shared/ui/Button";
import {useNavigate} from "react-router-dom";
import {routePaths} from "@/app/providers/router";

interface DataRow {
  [key: string]: any; // Используем any, чтобы учесть любые типы данных
}

export const ExcelUploader = () => {
  const [xlsxData, setXlsxData] = useState<DataRow[]>([]);
  const [data, setData] = useState<DataRow[]>([]);
  const [selectedHeaders, setSelectedHeaders] = useState<SelectOptions[]>([]);
  const [xlsHeader, setXlsHeader] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(routePaths.prices);
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, {type: 'array'});

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        let jsonData: DataRow[] = XLSX.utils.sheet_to_json(worksheet, {header: 1});

        // Проверка на пустую первую строку
        if (jsonData.length > 0 && jsonData[0].every((cell: any) => cell === "")) {
          jsonData = jsonData.slice(1); // Удаляем первую пустую строку
        }

        const headers = jsonData[0] as string[]; // Первую строку используем как заголовки
        setXlsHeader(headers);
        console.log('headers', headers.filter(Boolean))
        const emptyHeaders = headers
          .map(_ => ({value: null, label: null}));

        setSelectedHeaders(emptyHeaders);

        setData(jsonData.slice(1, 11)); // Записывам первые 10 строк данных (без заголовков)
        setXlsxData(jsonData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleHeaderChange = (index: number, newElement: SelectOptions) => {
    setSelectedHeaders(prevState => {
      // Создаем новый массив, чтобы не изменять старый массив напрямую
      const updatedHeaders = [...prevState];
      // Заменяем элемент в новом массиве
      updatedHeaders.splice(index, 1, newElement);
      return updatedHeaders;
    });
  };

  const handleSubmit = () => {
    const newHeaders = selectedHeaders.map(el => el?.value).filter(Boolean)

    const dataWithHeaders = xlsxData.map(row => {
      return newHeaders.reduce((acc: DataRow, header: string, index: number) => {
        acc[header] = row[index];
        return acc;
      }, {});
    });

    console.log('dataWithHeaders', dataWithHeaders)

    // setData(dataWithHeaders);

  };

  const selectOptions = createSelectOptions();
  const selectedValues = selectedHeaders.map(el => el?.value);

  const freeOptions = selectOptions.map(el => {
    if (selectedValues.includes(el?.value)) {
      return {...el, disabled: true}
    }

    return el
  });

  return (
    <div className={cls.wrapper}>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload}/>

      {data.length > 0 && (
        <div className={cls.body}>
          <h3>{lang.title.uploadingXLSXData}</h3>
          <table>
            <thead>
            <tr>
              {selectedHeaders.map((header, index) => (
                <th key={index}>
                  <Select<SelectOptions<any>>
                    onChange={(e) => handleHeaderChange(index, e)}
                    value={selectedHeaders[index]}
                    options={freeOptions}
                  />
                </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {selectedHeaders.map((header, colIndex) => (
                  <td key={colIndex}>{row[colIndex]}</td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
          <div className={cls.buttons}>
            <Button
              onClick={handleSubmit}
            > {lang.btn.save}
            </Button>
            <Button
              onClick={handleCancel}
              theme='clear'
            > {lang.btn.cancel}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
