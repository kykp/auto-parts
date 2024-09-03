import {ChangeEvent, useEffect, useState} from 'react';
import {lang} from "@/shared/consts/lang.ts";
import {Select} from "@/shared/ui/Field/Select";
import {clearAdditionalData, openModal} from "@/entities/Modals/model/slice/modalsSlice.ts";
import {createSelectOptions, MainPriceSchemaHeaderKeys,} from "@/entities/PriceList/model/types.ts";
import {SelectOptions} from "@/app/types/types.ts";
import {Button} from "@/shared/ui/Button";
import {useNavigate} from "react-router-dom";
import {routePaths} from "@/app/providers/router";
import {usePriceList} from "@/entities/PriceList/hooks/usePriceList/usePriceList.ts";
import {useDispatch} from "react-redux";
import {ModalTypes} from "@/widgets/Modals";

import * as XLSX from 'xlsx';
import {useAppSelector} from "@/shared/hooks/useAppSelector";
import {getModal} from "@/entities/Modals/model/selectors/selector.ts";
import {useForm} from "react-hook-form";
import {FieldController} from "@/shared/ui/FieldController";
import {InfoHeaderBlock} from "./InfoHeaderBlock/InfoHeaderBlock.tsx";

import cls from './ExcelUploader.module.scss';
import {Loader} from "@/shared/ui/Loader";

interface DataRow {
  [key: string]: any;
}

export const ExcelUploader = () => {
  const [xlsxData, setXlsxData] = useState<DataRow[]>([]);
  const [data, setData] = useState<DataRow[]>([]);
  const [selectedHeaders, setSelectedHeaders] = useState<SelectOptions[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {additionalData} = useAppSelector(getModal);

  const extraChangePrice = additionalData?.myPrice;
  const {watch, control} = useForm();

  const supplierWatcher = watch('supplier');

  const isArticleSelected = selectedHeaders.some(el => el.value === 'article');
  const isNameSelected = selectedHeaders.some(el => el.value === 'name');
  const isSupplierSelected = selectedHeaders.some(el => el.value === 'supplier') || supplierWatcher;

  const isButtonDisabled = !isArticleSelected || !isNameSelected || !isSupplierSelected;

  const {bulkUpdatePrice} = usePriceList();


  const handleModal = () => {
    dispatch(openModal({
      modalType: ModalTypes.UploadPriceMutation,
    }));
  }

  const handleCancel = () => {
    navigate(routePaths.prices)
    dispatch(clearAdditionalData());
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
        const filteredHeaders = headers.filter(Boolean)

        const emptyHeadersInit = filteredHeaders.map(_ => ({value: null, label: null}));

        setSelectedHeaders(emptyHeadersInit);

        // Конвертируем все ячейки в строки
        const stringifiesData = jsonData.map(row =>
          row.map(cell => (cell !== null && cell !== undefined) ? String(cell) : "")
        );
        // Удал
        // яем данные в столбцах с пустыми заголовками
        const filteredData = stringifiesData.slice(1).map(row =>
          row.filter((_: any, index: number) => Boolean(headers[index]))
        );

        setData(filteredData.slice(0, 5)); // Отображаем первые 10 строк данных (без заголовков)
        setXlsxData(filteredData);
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

  const onHandleSubmit = async () => {
    setIsLoading(true);
    const newHeaders = selectedHeaders.map((el: SelectOptions<MainPriceSchemaHeaderKeys>) => el?.value);

    const dataWithHeaders = xlsxData.map(row => {
      return newHeaders.reduce<Record<MainPriceSchemaHeaderKeys, any>>((acc, header, index) => {
        const cellValue = row[index];

        if (header) { // Проверка на null или пустую строку
          acc[header] = cellValue;
        }

        if (header === 'purchase_price' && extraChangePrice) {
          const purchasePrice = parseFloat(cellValue?.replace(/[^\d.-]/g, '')) || 0;
          acc['purchase_price'] = String(purchasePrice);
          acc['price'] = String(purchasePrice + (purchasePrice * (extraChangePrice / 100)));
        }

        if (supplierWatcher) {
          acc['supplier'] = supplierWatcher;
        }

        if (header === 'article') {
          acc['article'] = typeof cellValue === 'string' ? cellValue.replace(/\s+/g, '') : '';
        }

        acc['min_order_qty'] = cellValue > 1 ? cellValue : 1;

        return acc;
      }, {
        article: undefined,
        brand: undefined,
        delivery_time: undefined,
        min_order_qty: undefined,
        name: undefined,
        price: undefined,
        purchase_price: undefined,
        quantity: undefined,
        supplier: undefined
      });
    }).filter(row => Object.keys(row).length > 0);


    try {
      const response = await bulkUpdatePrice(dataWithHeaders as any);

      if (response) {
        dispatch(openModal({
          modalType: ModalTypes.UploadPrice,
          modalProps: {message: lang.notification.xlsxSuccess, type: 'successful'}
        }));
      }

    } catch (e) {
      dispatch(openModal({
        modalType: ModalTypes.UploadPrice,
        modalProps: {message: lang.notification.uploadXlsx, type: 'error'}
      }));
      console.log('Ошибка загрузки прайс листа из ексель файла', e)
    } finally {
      dispatch(clearAdditionalData());
      setIsLoading(false)
    }
  };

  const selectOptions = createSelectOptions();
  const selectedValues = selectedHeaders.map(el => el?.value);

  const freeOptions = selectOptions.map(el => {
    if (selectedValues.includes(el?.value)) {
      return {...el, disabled: true}
    }
    return el
  });

  const isShowPercentAdditionalPrice = selectedHeaders.find(el => el.value === "purchase_price");
  const isShowInput = data.length < 1;

  useEffect(() => {
    if (isShowPercentAdditionalPrice) {
      handleModal();
    }
  }, [isShowPercentAdditionalPrice])

  if (isLoading) {
    return <Loader progress={uploadProgress}/>
  }

  return (
    <div className={cls.wrapper}>
      <InfoHeaderBlock
        isArticleSelected={isArticleSelected}
        isNameSelected={isNameSelected}
        isSupplierSelected={isSupplierSelected}
      />
      <div className={cls.header}>
        <FieldController.Input
          name={'supplier'}
          control={control}
          label={lang.label.supplier}
          className={cls.header_supplier}
          placeholder={lang.placeHolder.supplier}
        />
        {isShowInput && (
          <label className={cls.custom_file_upload}>
            Добавить xls документ
            <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload}/>
          </label>
        )}
        {extraChangePrice && <span>Наценка на текущий прайс = +{extraChangePrice} %</span>}

        {isShowPercentAdditionalPrice &&
          <Button
            onClick={handleModal}
            theme='primary'
            className={cls.button}
          >
            настройки
          </Button>}
      </div>

      {
        data.length > 0 && (
          <div className={cls.body}>
            <table>
              <thead>
              <tr>
                {selectedHeaders.map((header, index) => (
                  <th key={index}>
                    <Select
                      <SelectOptions<any>>
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
                onClick={onHandleSubmit}
                disabled={isButtonDisabled}
              > {lang.btn.save}
              </Button>
              <Button
                onClick={handleCancel}
                theme='clear'
              > {lang.btn.cancel}
              </Button>
            </div>
          </div>
        )
      }
    </div>
  )
    ;
};
