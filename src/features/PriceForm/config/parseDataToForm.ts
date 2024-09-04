import {PriceSchema} from "@/entities/PriceList/model/types.ts";
import {FormValues} from "@/features/PriceForm/types/types.ts";
import {defaultValues} from './defaultValues.ts'

export const parseDataToForm = (data: PriceSchema): FormValues => {
  if (!data) {
    return defaultValues
  }

  const {purchase_price, price, delivery_time, name, min_order_qty, brand, article, articleRu, quantity, supplier} = data;

  return {
    purchase_price,
    price,
    delivery_time,
    name,
    supplier,
    quantity,
    article,
    articleRu,
    brand,
    min_order_qty
  }
}
