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

export interface PriceSchemaMutation extends Omit<PriceSchema, 'id'>{
}
