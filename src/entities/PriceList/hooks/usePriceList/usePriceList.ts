import {useFetch} from "@/shared/hooks/useFetch";
import {PriceList} from "@/entities/PriceList/api/service.ts";
import {PriceSchema} from "@/entities/PriceList/model/types.ts";
import {useCallback, useEffect, useState} from "react";

interface UsePriceListProps {
  id?: string;
}

export const usePriceList = (props: UsePriceListProps = {}) => {
  const {id} = props;

  const {data, query, error, isLoading} = useFetch<PriceSchema[]>('/price-list/price');

  const getElementById = useFetch(`/price-list/:${id}`);

  const deleteElement = PriceList.deletePriceElement;
  const createElement = PriceList.createPriceElement;
  const updateElement = PriceList.updatePriceElementById;

  return {
    data,
    query,
    error,
    isLoading,
    getElementById,
    deleteElement,
    createElement,
    updateElement,
  }
}
