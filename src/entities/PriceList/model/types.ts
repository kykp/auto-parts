import {SelectOptions} from "@/app/types/types.ts";

export interface PriceSchema {
  id: number;
  article: string;
  name: string;
  brand: string;
  delivery_time: string;
  min_order_qty: string;
  quantity: string;
  supplier: string;
  price: string;
  purchase_price: string;
}

export interface PriceSchemaMutation extends Omit<PriceSchema, 'id'> {
}

// Утилитный тип для получения ключей MainPriceSchemaHeaders
export type MainPriceSchemaHeaderKeys = keyof PriceSchemaMutation;

// Переводы для ключей
const translations: Record<PriceSchemaMutation, string> = {
  article: 'Артикул',
  name: 'Название',
  brand: 'Бренд',
  delivery_time: 'Время поставки',
  min_order_qty: 'Минимальный ордер',
  quantity: 'Количество',
  supplier: 'Поставщик',
  purchase_price: 'Закупочная цена',
  price: 'Цена',


};

// Функция для преобразования ключей в опции
export const createSelectOptions = (): SelectOptions<MainPriceSchemaHeaderKeys>[] => {
  // Получаем ключи из интерфейса MainPriceSchemaHeaders
  const keys: MainPriceSchemaHeaderKeys[] = [
    'article',
    'name',
    'brand',
    'delivery_time',
    'min_order_qty',
    'quantity',
    'supplier',
    'price',
    'purchase_price'
  ];

  // Преобразуем ключи в массив опций
  return keys.map(key => ({
    value: key,
    label: translations[key] || key, // Используем перевод, если он есть
  }));
};
