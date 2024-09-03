import {SelectOptions} from "@/app/types/types.ts";

export interface PriceListResponse {
  priceList: PriceSchema[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface FullPriceListResponse  extends  Pick<PriceListResponse, 'priceList'>{
}

export interface ParamsGetPriceList {
  page: number;
  limit: number;
  searchBy?: string;
  q?: string;
}

export interface PriceSchema {
  id: number;
  article: string;
  name: string;
  brand: string;
  delivery_time: string;
  min_order_qty: number;
  quantity: number;
  supplier: string;
  price: number;
  purchase_price: number;
}

export interface PriceSchemaMutation extends Omit<PriceSchema, 'id'> {
}

// Утилитный тип для получения ключей MainPriceSchemaHeaders
export type MainPriceSchemaHeaderKeys = keyof PriceSchemaMutation;

// Переводы для ключей
export const translations: Record<MainPriceSchemaHeaderKeys, string> = {
  article: 'Артикул',
  name: 'Наименование',
  brand: 'Бренд',
  delivery_time: 'Время поставки',
  min_order_qty: 'Минимальный заказ',
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
    'supplier',
    'brand',
    'delivery_time',
    'min_order_qty',
    'quantity',
    'purchase_price',
    'price'
  ];

  // Преобразуем ключи в массив опций
  return keys.map(key => ({
    value: key,
    label: translations[key] || key, // Используем перевод, если он есть
  }));
};
