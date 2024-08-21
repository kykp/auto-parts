import { ReactNode, useState } from 'react';

import { ShouldUpdateContext } from '../consts/context';

interface ShouldUpdateProviderProps {
  children: ReactNode
}

export const ShouldUpdateProvider = (props: ShouldUpdateProviderProps) => {

  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <ShouldUpdateContext.Provider value={{ isUpdate, setIsUpdate }}>
      {props.children}
    </ShouldUpdateContext.Provider>
  );
};
