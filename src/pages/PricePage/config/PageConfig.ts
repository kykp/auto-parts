import {lang} from '@/shared/consts/lang.ts';
import {tableConfig} from "@/entities/PriceList/config/tableConfig.ts";

const PageConfig = {
  searchBy: [
    {value: 'article', label: lang.cell.article},
    {value: 'name', label: lang.cell.name},
  ],
  header: {
    title: lang.title.basePrice,
  },
  tableConfig,
};

export default PageConfig;
