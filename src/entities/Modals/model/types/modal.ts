import type { ModalDataById, ModalIdsType } from './modalIds';

export interface IModal<T extends ModalIdsType> {
  modalId: T,
  data: ModalDataById[T]
}
