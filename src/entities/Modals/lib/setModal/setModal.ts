import { store } from '@/app/providers';

import { modalsAction } from '../../model/slice/modalsSlice';
import type { ModalIdsType } from '../../model/types/modalIds';
import { ModalDataById } from '../../model/types/modalIds';

export const setModal =
  (modalId: ModalIdsType, data: ModalDataById[ModalIdsType]) => {
    store.dispatch(
      modalsAction.addModal({
        modalId,
        data,
      })
    );
  };
