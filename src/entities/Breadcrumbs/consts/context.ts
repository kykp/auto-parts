import { createContext } from 'react';

interface IBreadcrumbContext {
  path: string,
  setPath: (val: string) => void
  params: Record<string, any>
  setParams: (val: Record<string, any>) => void
}

export const BreadcrumbContext = createContext<IBreadcrumbContext>({
  path: '',
  setPath: () => {},
  params: {},
  setParams: () => {},
});
