import { useContext } from 'react';

import { ShouldUpdateContext } from '../../consts/context';

export const useShouldUpdate = () => {
  return useContext(ShouldUpdateContext);
};
