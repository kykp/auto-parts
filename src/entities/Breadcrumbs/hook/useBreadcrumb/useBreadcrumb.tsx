import { useContext } from 'react';

import { BreadcrumbContext } from '../../consts/context';

export const useBreadcrumb = () => {
  return useContext(BreadcrumbContext);
};
