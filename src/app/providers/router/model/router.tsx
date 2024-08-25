import {MainPage} from '@/pages/MainPage';
import {PricePage} from "@/pages/PricePage";
import {PriceDetailsPage} from "@/pages/PriceDetailsPage";
import {PriceUploadPage} from "@/pages/PriceUploadPage";

import {BrowserIcon, HomePageIcon} from '@/shared/Icon'

import {routePaths} from './routePaths';
import {RouteSchema} from './types';

export const appRoutes: RouteSchema[] = [
  {
    path: routePaths.mainPage,
    Component: MainPage,
    name: 'Главная',
    inMenu: true,
    Icon: <HomePageIcon width={20} height={20}/>,
  },
  {
    path: routePaths.prices,
    Component: PricePage,
    name: 'Прайс',
    inMenu: true,
    Icon: <BrowserIcon width={20} height={20}/>,
  },
  {
    path: routePaths.createPriceItem,
    Component: PriceDetailsPage,
  },
  {
    path: routePaths.editPriceItem,
    Component: PriceDetailsPage,
  },
  {
    path: routePaths.uploadPrice,
    Component: PriceUploadPage,
  }
];
