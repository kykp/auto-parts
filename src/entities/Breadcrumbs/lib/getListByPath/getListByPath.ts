import { routePaths } from '@/app/providers/router';
import { BreadcrumbItem } from '../../model/types';

export const getListByPath = (path: string): BreadcrumbItem[] => {
  switch (path) {
    case routePaths.mainPage:
      return [];
    default:
      return [];
  }
};
