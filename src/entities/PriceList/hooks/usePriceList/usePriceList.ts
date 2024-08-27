import {useFetch} from "@/shared/hooks/useFetch";
import {PriceList} from "@/entities/PriceList/api/service.ts";
import {PriceSchema} from "@/entities/PriceList/model/types.ts";
import {useCallback, useEffect, useState} from "react";
import {PresenceContext} from "framer-motion";

interface UsePriceListProps {
  id?: string;
}

export const usePriceList = (props: UsePriceListProps = {}) => {
  const {id} = props;

  const {data, query, error, isLoading} = useFetch<PriceSchema[]>('/price-list/price');

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
