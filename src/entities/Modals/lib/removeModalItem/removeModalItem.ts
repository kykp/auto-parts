import { store } from '@/app/providers';

import { modalsAction } from '../../model/slice/modalsSlice';

/**
 * Удаляем инстанс из стака
 */
export const removeModalItem = () => {
  store.dispatch(modalsAction.removeModal());
};
