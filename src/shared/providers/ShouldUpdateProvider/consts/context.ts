import { createContext } from 'react';

interface ShouldUpdate {
  isUpdate: boolean,
  setIsUpdate: (val: boolean) => void
}

export const ShouldUpdateContext = createContext<ShouldUpdate | null>(null);
