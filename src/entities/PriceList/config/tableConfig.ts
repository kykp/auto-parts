import {lang} from '@/shared/consts/lang';
import {TableConfig} from '@/shared/ui/Table';

import {PriceSchema} from '../model/types.ts';
import {DropdownList} from '../ui/DropDownList/DropDownList';
import {ArticleCustom} from "@/entities/PriceList/ui/ArticleCustom/ArticleCustom.tsx";

export const tableConfig = (): TableConfig<PriceSchema> => ({
  cells: [
    {
      name: lang.cell.article,
      dataAnchor: 'article',
      component: ArticleCustom,
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
      dataAnchor: 'delivery_time',
    },
    {
      name: lang.cell.quantity,
      dataAnchor: 'quantity',
    },
    {
      name: lang.cell.minOrderQty,
      dataAnchor: 'min_order_qty',
    },
    {
      name: lang.cell.purchasePrice,
      dataAnchor: 'purchase_price',
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
      }),
    },
  ],
});
