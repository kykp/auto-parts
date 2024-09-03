import {useEffect} from "react";
import {useSafeParams} from "@/shared/hooks/useSafeParams";
import PageConfig from '../config/PageConfig.ts';
import {PageTable} from '@/widgets/PageTemplates';
import {MainPriceSchemaHeaderKeys, ParamsGetPriceList, PriceSchema} from "@/entities/PriceList/model/types.ts";
import {usePriceList} from "@/entities/PriceList/hooks/usePriceList/usePriceList.ts";
import {useRefetch} from "@/shared/hooks/useRefetch";
import {Title} from './Title/Title.tsx'

export const PricePage = () => {
  const {page, limit, q, searchBy} = useSafeParams({
    limit: {
      rules: ['hasInArray'],
      safeValue: '20',
      values: ['20'],
    },
    searchBy: {
      rules: ['hasInArray'],
      safeValue: PageConfig.searchBy[0].value,
      values: PageConfig.searchBy.map(el => el.value),
    },
  });

  const searchByKey = searchBy as MainPriceSchemaHeaderKeys;

  const {query, isLoading, data} = usePriceList();

  const queryParams: ParamsGetPriceList = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    searchBy: searchByKey, // Здесь нужно убедиться, что searchByKey соответствует типу string или необходимому типу
    q: q,
  };

  useEffect(() => {
    query(queryParams);
  }, [page, q]);

  useRefetch({query , queryParams})

  return (
    <PageTable
      <PriceSchema>
      searchValue={q}
      page={page}
      perPage={limit}
      perPageList={['20']}
      total={data?.totalItems || 0}
      searchBy={searchBy}
      tableConfig={PageConfig.tableConfig()}
      tableData={data?.priceList}
      options={PageConfig.searchBy}
      isLoading={isLoading}
    >
      <Title/>
    </PageTable>
  )
}
