import {useEffect, useMemo} from "react";
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
import {useAppSelector} from "@/shared/hooks/useAppSelector";
import {getModal} from "@/entities/Modals/model/selectors/selector.ts";
import {useDispatch} from "react-redux";
import {resetShouldRefetch} from "@/entities/Modals/model/slice/modalsSlice.ts";

export const PricePage = () => {
  const {q, searchBy} = useSafeParams({
    searchBy: {
      values: PageConfig.searchBy.map(el => el.value),
    },
  });
  const dispatch = useDispatch();
  const {query, isLoading, data} = usePriceList();
  const {shouldRefetch} = useAppSelector(getModal);

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
    if (shouldRefetch) {
      query().then(_ => dispatch(resetShouldRefetch()))
    }
  }, [shouldRefetch]);

  useEffect(() => {
    query();
  }, []);

  return (
    <PageTable
      <PriceSchema>
      searchValue={q}
      searchBy={searchBy}
      tableConfig={PageConfig.tableConfig()}
      tableData={filteredData}
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
