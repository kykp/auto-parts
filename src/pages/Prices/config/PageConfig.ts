import {lang} from '@/shared/consts/lang';
import {tableConfig} from "@/entities/Price/config/tableConfig.ts";

const PageConfig = {
  searchBy: [
    {value: 'name', label: lang.cell.name},
  ],
  header: {
    title: lang.title.basePrice,
  },
  tableConfig,
};

export default PageConfig;
