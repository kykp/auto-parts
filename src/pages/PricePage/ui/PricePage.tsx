import {useEffect} from "react";
import {useSafeParams} from "@/shared/hooks/useSafeParams";
import {routePaths} from "@/app/providers/router";
import {PlusIcon} from "@/shared/Icon";
import {lang} from "@/shared/consts/lang.ts";
import PageConfig from '../config/PageConfig.ts';
import {PageTable} from '@/widgets/PageTemplates';
import {Section} from '@/shared/ui/Section'
import {AppLink} from "@/shared/ui/AppLink";
import {Button} from "@/shared/ui/Button";
import {PriceSchema} from "@/entities/PriceList/model/types.ts";
import {usePriceList} from "@/entities/PriceList/hooks/usePriceList/usePriceList.ts";
import {useRefetch} from "@/shared/hooks/useRefetch";
import {filteredData} from '../config/tableDataParser.ts'

export const PricePage = () => {
  const {q, searchBy} = useSafeParams({
    searchBy: {
      rules: ['hasInArray'],
      safeValue: PageConfig.searchBy[0].value,
      values: PageConfig.searchBy.map(el => el.value),
    },
  });

  const {query, isLoading, data} = usePriceList();
  useRefetch({query})

  const tableData = filteredData({data, q})

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
      <Section.Title title={PageConfig.header.title}>
        <AppLink to={routePaths.createPriceItem}>
          <Button Icon={PlusIcon}>
            {lang.btn.create}
          </Button>
        </AppLink>
      </Section.Title>
    </PageTable>
  )
}
