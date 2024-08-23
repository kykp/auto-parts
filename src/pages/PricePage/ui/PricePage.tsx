import {useCallback, useEffect, useMemo} from "react";
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

export const PricePage = () => {
  const {q, searchBy} = useSafeParams({
    searchBy: {
      rules: ['hasInArray'],
      safeValue: PageConfig.searchBy[0].value,
      values: PageConfig.searchBy.map(el => el.value),
    },
  });

  const {query, isLoading, data, error} = usePriceList();

  // const params = useMemo(() => ({
  //   ...(searchBy && q ? { [searchBy]: q } : {}),
  // }), [q, searchBy]);

  console.log('data', data)
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

  useEffect(() => {
    query();
  }, []);

  return (
    <PageTable<PriceSchema>
      searchValue={q}
      searchBy={searchBy}
      tableConfig={PageConfig.tableConfig()}
      tableData={filteredData || []}
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
