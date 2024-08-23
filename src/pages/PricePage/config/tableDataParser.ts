import {PriceSchema} from "@/entities/PriceList/model/types.ts";
import {useMemo} from "react";

interface FilteredDataProps {
  data: PriceSchema[];
  q: string;
}

export const filteredData = (props: FilteredDataProps) => {
  const {data, q} = props;

  const filteredData: PriceSchema[] = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    if (!q) {
      return data;
    }

    const lowercaseQuery = q.toLowerCase();

    return data.filter((el: PriceSchema) =>
      el.name.toLowerCase().includes(lowercaseQuery)
    );
  }, [q, data]);

  return filteredData;
}
