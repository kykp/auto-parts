import { removeModalItem } from './lib/removeModalItem/removeModalItem';
import { setModal } from './lib/setModal/setModal';
import { getModalList } from './model/selectors/getModalList/getModalList';
import { ModalIds } from './model/types/modalIds';
import type { ModalSchema } from './model/types/modalSchema';

export * from './model/types/modalIds';

export {
  ModalIds,
  setModal,
  removeModalItem,
  getModalList,
};

export type {
  ModalSchema,
};
