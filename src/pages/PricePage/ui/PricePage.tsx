import {useEffect} from "react";
import {useSafeParams} from "@/shared/hooks/useSafeParams";
import PageConfig from '../config/PageConfig.ts';
import {PageTable} from '@/widgets/PageTemplates';
import {MainPriceSchemaHeaderKeys, PriceSchema} from "@/entities/PriceList/model/types.ts";
import {usePriceList} from "@/entities/PriceList/hooks/usePriceList/usePriceList.ts";
import {useRefetch} from "@/shared/hooks/useRefetch";
import {filteredData} from '../config/tableDataParser.ts'
import {Title} from './Title/Title.tsx'

export const PricePage = () => {
  const {q, searchBy} = useSafeParams({
    searchBy: {
      rules: ['hasInArray'],
      safeValue: PageConfig.searchBy[0].value,
      values: PageConfig.searchBy.map(el => el.value),
    },
  });

  const searchByKey = searchBy as MainPriceSchemaHeaderKeys;

  const {query, isLoading, data} = usePriceList();

  useRefetch({query})

  const tableData = filteredData({ data, q, searchBy: searchByKey });

  useEffect(() => {
    query();
  }, []);

  return (
    <PageTable
      <PriceSchema>
      searchValue={q}
      searchBy={searchBy}
      tableConfig={PageConfig.tableConfig()}
      tableData={tableData}
      options={PageConfig.searchBy}
      isLoading={isLoading}
    >
      <Title/>
    </PageTable>
  )
}
