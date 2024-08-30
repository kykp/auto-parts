import {MainPriceSchemaHeaderKeys, PriceSchema} from "@/entities/PriceList/model/types.ts";
import {useMemo} from "react";

interface FilteredDataProps {
  data: PriceSchema[];
  q: string;
  searchBy: MainPriceSchemaHeaderKeys,
}

export const filteredData = (props: FilteredDataProps) => {
  const {data, q, searchBy} = props;

  const filteredData: PriceSchema[] = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    if (!q) {
      return data;
    }

    // Разбиваем запрос на отдельные слова
    const queryWords = q.toLowerCase().split(/\s*\+\s*/);

    // Фильтруем данные, проверяя наличие каждого слова в элементе
    return data.filter((el: PriceSchema) =>
      queryWords.every(word => {
        // Убедитесь, что searchBy является корректным ключом для el
        const value = el[searchBy];
        return typeof value === 'string' && value.toLowerCase().includes(word);
      })
    );
  }, [q, data, searchBy]);
  return filteredData;
}
