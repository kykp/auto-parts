import cls from "./InfoHeaderBlock.module.scss";
import clsx from "clsx";
import {useEffect, useState} from "react";

const headers = [
  {text: 'Артикул', value: 'article', id: 1},
  {text: 'Поставщик', value: 'supplier', id: 2},
  {text: 'Наименование', value: 'name', id: 3}
];


interface InfoHeaderBlockProps {
  isArticleSelected: boolean;
  isNameSelected: boolean;
  isSupplierSelected: boolean;
}

export const InfoHeaderBlock = (props: InfoHeaderBlockProps) => {
  const {isSupplierSelected, isNameSelected, isArticleSelected} = props;

  const [activeIndexes, setActiveIndexes] = useState([]);

  useEffect(() => {
    const newActiveIndexes = [];
    if (isArticleSelected) newActiveIndexes.push(headers.findIndex(h => h.value === 'article'));
    if (isSupplierSelected) newActiveIndexes.push(headers.findIndex(h => h.value === 'supplier'));
    if (isNameSelected) newActiveIndexes.push(headers.findIndex(h => h.value === 'name'));

    setActiveIndexes(newActiveIndexes);
  }, [isArticleSelected, isNameSelected, isSupplierSelected]);

  return (
    <div className={cls.info}>
      <div>
        <h3>Необходимо выбрать обязательные данные</h3>
      </div>
      <div className={cls.info_body}>
        {headers.map((text, index) => (
          <div
            key={text.id}
            className={clsx(cls.item, {[cls.active]: activeIndexes.includes(index)})}
          >
            {text.text}
          </div>
        ))}
      </div>
    </div>
  )
}
