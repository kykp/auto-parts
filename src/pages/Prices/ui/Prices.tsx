import {useCallback, useMemo} from "react";
import {useSafeParams} from "@/shared/hooks/useSafeParams";
import {routePaths} from "@/app/providers/router";
import {PlusIcon} from "@/shared/Icon";
import {lang} from "@/shared/consts/lang.ts";
import PageConfig from '../config/PageConfig.ts';
import {PageTable} from '@/widgets/PageTemplates';
import {Section} from '@/shared/ui/Section'
import {AppLink} from "@/shared/ui/AppLink";
import {Button} from "@/shared/ui/Button";
import {PriceSchema} from "@/entities/Price/model/types.ts";

const mockData: PriceSchema[] = [
  {
    id: 1,
    name: 'Колесо образивное',
    article: 'KLSD123',
    brand: "LADA",
    price: '2500',
    purchasePrice: '2000',
    deliveryTime: '4-5',
    quantity: '50',
    minOrderQty: '1',
    supplier: 'Пятый элемент'
  },
  {
    id: 2,
    name: 'Мотороное масло APEROL',
    article: 'TSTSKL',
    brand: "NISSAN",
    price: '2500',
    purchasePrice: '2000',
    deliveryTime: '4-5',
    quantity: '50',
    minOrderQty: '10',
    supplier: 'Автоваз'
  },
  {
    id: 3,
    name: 'Выхлопная труба окрашенная',
    article: '1243XLCASF',
    brand: "BMW",
    price: '2500',
    purchasePrice: '2000',
    deliveryTime: '4-5',
    quantity: '50',
    minOrderQty: '1',
    supplier: 'Большое название поставщика которое может быть и не поместиться вовсе'
  }
]
export const Prices = () => {
  const {q, searchBy} = useSafeParams({
    searchBy: {
      rules: ['hasInArray'],
      safeValue: PageConfig.searchBy[0].value,
      values: PageConfig.searchBy.map(el => el.value),
    },
  });

  const isLoading = true;

  // const params = useMemo(() => ({
  //   ...(searchBy && q ? { [searchBy]: q } : {}),
  // }), [q, searchBy]);


  // useEffect(() => {
  //   query();
  // }, []);
  //
  const refetch = useCallback(() => {
    // query({}, 'network');
  }, []);

  const filteredData = useMemo(() => {
    if (!q) {
      return mockData
    }

    return mockData.filter(el => el.name.toLowerCase().includes(q.toLowerCase()))
  }, [q, mockData])

  return (
    <PageTable<PriceSchema>
      searchValue={q}
      searchBy={searchBy}
      tableConfig={PageConfig.tableConfig(refetch)}
      tableData={filteredData}
      options={PageConfig.searchBy}
      isLoading={isLoading}
    >
      <Section.Title title={PageConfig.header.title}>
        <AppLink to={routePaths.mainPage}>
          <Button Icon={PlusIcon}>
            {lang.btn.create}
          </Button>
        </AppLink>
      </Section.Title>
    </PageTable>
  )
}
