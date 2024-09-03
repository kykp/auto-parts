import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {resetShouldRefetch, setShouldRefetch} from "@/entities/Modals/model/slice/modalsSlice.ts";
import {useAppSelector} from "@/shared/hooks/useAppSelector";
import {getModal} from "@/entities/Modals/model/selectors/selector.ts";
import {ParamsGetPriceList, PriceListResponse} from "@/entities/PriceList/model/types.ts";

export interface UseRefetchProps {
  query?: (params: ParamsGetPriceList) => void;
  queryParams?: ParamsGetPriceList;
}

export const useRefetch = (props?: UseRefetchProps) => {
  // Добавим проверку на наличие props
  const query = props?.query;
  const queryParams = props?.queryParams;

  const dispatch = useDispatch();

  const {shouldRefetch} = useAppSelector(getModal);

  const startRefetch = () => {
    dispatch((setShouldRefetch()));
  }

  const stopRefetch = () => {
    dispatch(resetShouldRefetch());
  }

  useEffect(() => {
    const performRefetch = async () => {
      if (shouldRefetch) {
        try {
          await query(queryParams);
        } catch (error) {
          console.error('Error executing query:', error);
        } finally {
          stopRefetch();
        }
      }
    };

    performRefetch();
  }, [shouldRefetch, query, dispatch]);

  return {startRefetch}
}
