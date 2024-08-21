import { ReactNode, useState } from 'react';

import { BreadcrumbContext } from '../../consts/context';

interface BreadcrumbProviderProps {
  children: ReactNode
}

export const BreadcrumbProvider = (props: BreadcrumbProviderProps) => {
  const [path, setPath] = useState('');
  const [params, setParams] = useState({});

  return (
    <BreadcrumbContext.Provider
      value={{
        path,
        setPath,
        params,
        setParams,
      }}
    >
      {props.children}
    </BreadcrumbContext.Provider>
  );
};
