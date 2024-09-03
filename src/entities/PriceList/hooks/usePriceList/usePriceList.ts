import {useFetch} from "@/shared/hooks/useFetch";
import {PriceList} from "@/entities/PriceList/api/service.ts";
import {ParamsGetPriceList, PriceListResponse, PriceSchema} from "../../model/types.ts";

interface UsePriceListProps {
  id?: string;
}

export const usePriceList = (props: UsePriceListProps = {}) => {
  const {id} = props;

  const {data, query, error, isLoading, } = useFetch<PriceListResponse, ParamsGetPriceList>('/price-list/price');

  const {data: dataById, query: queryById, isLoading: isLoadingById} = useFetch<PriceSchema>(`/price-list/${id}`);

  const deleteElement = PriceList.deletePriceElement;
  const createElement = PriceList.createPriceElement;
  const updateElement = PriceList.updatePriceElementById;
  const bulkUpdatePrice = PriceList.bulkUploadPrice;
  const deletePrice = PriceList.deleteAllPrices;

  return {
    data,
    query,
    error,
    isLoading,
    dataById,
    queryById,
    isLoadingById,
    deleteElement,
    createElement,
    updateElement,
    bulkUpdatePrice,
    deletePrice,
  }
}
