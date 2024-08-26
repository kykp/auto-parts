import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {resetShouldRefetch, setShouldRefetch} from "@/entities/Modals/model/slice/modalsSlice.ts";
import {useAppSelector} from "@/shared/hooks/useAppSelector";
import {getModal} from "@/entities/Modals/model/selectors/selector.ts";

export interface UseRefetchProps<T> {
  query?: (params?: object) => Promise<T[]>
}

export const useRefetch = (props: UseRefetchProps<any> = {}) => {
  const {query} = props;

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
          await query();
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
