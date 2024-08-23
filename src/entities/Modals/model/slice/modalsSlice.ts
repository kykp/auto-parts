// src/store/modalSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ModalTypes} from '@/features/Modals';

export interface ModalStateSchema {
  isOpen: boolean;
  modalType?: ModalTypes;
  modalProps?: Record<string, any>;
}

const initialState: ModalStateSchema = {
  isOpen: false,
  modalType: null,
  modalProps: {},
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
  },
});

export const {openModal, closeModal} = modalSlice.actions;

export default modalSlice.reducer;
