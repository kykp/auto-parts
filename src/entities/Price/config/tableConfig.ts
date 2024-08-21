import {lang} from '@/shared/consts/lang';
import {TableConfig} from '@/shared/ui/Table';

import {PriceSchema} from '../model/types.ts';
import {DropdownList} from '../ui/DropDownList/DropDownList';

export const tableConfig = (refetch: () => void): TableConfig<PriceSchema> => ({
  cells: [
    {
      name: lang.cell.article,
      dataAnchor: 'article',
    },
    {
      name: lang.cell.name,
      dataAnchor: 'name',
    },
    {
      name: lang.cell.brand,
      dataAnchor: 'brand',
    },
    {
      name: lang.cell.supplier,
      dataAnchor: 'supplier',
    },
    {
      name: lang.cell.deliveryTime,
      dataAnchor: 'deliveryTime',
    },
    {
      name: lang.cell.quantity,
      dataAnchor: 'quantity',
    },
    {
      name: lang.cell.minOrderQty,
      dataAnchor: 'minOrderQty',
    },
    {
      name: lang.cell.purchasePrice,
      dataAnchor: 'purchasePrice',
    },
    {
      name: lang.cell.price,
      dataAnchor: 'price',
    },
    {
      name: '',
      cellCustomStyle: {
        width: 32,
      },
      component: (props) => DropdownList({
        name: props.row.name,
        id: props.row.id,
        refetch,
      }),
    },
  ],
});
