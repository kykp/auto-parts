import { MainPage } from '@/pages/MainPage';
import {Prices} from "@/pages/Prices";

import { HomePageIcon, BrowserIcon} from '@/shared/Icon'

import { routePaths } from './routePaths';
import { RouteSchema } from './types';

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
    Component: Prices,
    name: 'Прайсы',
    inMenu: true,
    Icon: <BrowserIcon width={20} height={20} />,
  },
];
