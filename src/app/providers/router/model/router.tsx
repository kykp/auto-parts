import { MainPage } from '@/pages/MainPage';
import {PricePage} from "@/pages/PricePage";

import { HomePageIcon, BrowserIcon} from '@/shared/Icon'

import { routePaths } from './routePaths';
import { RouteSchema } from './types';
import {PriceCreateForm} from "@/features/PriceForm";

export const appRoutes: RouteSchema[] = [
  {
    path: routePaths.mainPage,
    Component: MainPage,
    name: 'Главная',
    inMenu: true,
    Icon: <HomePageIcon width={20} height={20} />,
},
  {
    path: routePaths.prices,
    Component: PricePage,
    name: 'Прайс',
    inMenu: true,
    Icon: <BrowserIcon width={20} height={20} />,
  },
  {
    path: routePaths.createPriceItem,
    Component: PriceCreateForm,
  }
];
