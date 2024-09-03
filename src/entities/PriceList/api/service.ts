import $api from "@/shared/api/axiosinstance.ts";
import {PriceSchemaMutation} from "@/entities/PriceList/model/types.ts";

export class PriceList {

  static createPriceElement = (data: PriceSchemaMutation) => {
    return $api.post('/price-list', data);
  }

  static updatePriceElementById = (data: PriceSchemaMutation, id: number) => {
    return $api.put(`/price-list/${id}`, data);
  }

  static deletePriceElement = (id: number) => {
    return $api.delete(`/price-list/${id}`)
  }

  static bulkUploadPrice = (data: PriceSchemaMutation) => {
    return $api.post('/price-list/bulk-update', {updatedPriceList: data})
  };

  static deleteAllPrices = () => {
    return $api.delete('/price-list/delete-all')
  }
}
