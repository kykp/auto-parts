import $api from "@/shared/api/axiosinstance.ts";
import {PriceSchemaMutation} from "@/entities/PriceList/model/types.ts";

export class PriceList {

  static createPriceElement = (data: PriceSchemaMutation) => {
    return $api.post('/price-list', data);
  }

  static updatePriceElementById = (id: number, data: PriceSchemaMutation) => {
    return $api.put(`/price-list/${id}`, data);
  }

  static deletePriceElement = (id: number) => {
    return $api.delete(`/price-list/${id}`)
  }
}
