import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ModalTypes} from '@/features/Modals';

export interface ModalStateSchema {
  isOpen: boolean;
  modalType?: ModalTypes;
  modalProps?: Record<string, any>;
  shouldRefetch: boolean,
}

const initialState: ModalStateSchema = {
  isOpen: false,
  modalType: null,
  modalProps: {},
  shouldRefetch: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ modalType: ModalTypes; modalProps?: Record<string, any> }>) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps || {};
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalProps = {};
    },
    setShouldRefetch(state) {
      state.shouldRefetch = true;
    },
    resetShouldRefetch(state) {
      state.shouldRefetch = false;
    },
  },
});

export const {openModal, closeModal, setShouldRefetch, resetShouldRefetch} = modalSlice.actions;

export default modalSlice.reducer;
