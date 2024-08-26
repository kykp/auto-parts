import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ModalTypes} from 'src/widgets/Modals';

export interface ModalStateSchema {
  isOpen: boolean;
  modalType?: ModalTypes;
  modalProps?: Record<string, any>;
  additionalData?: Record<string, any>;
  shouldRefetch: boolean,
}

const initialState: ModalStateSchema = {
  isOpen: false,
  modalType: null,
  modalProps: {},
  additionalData: {},
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
    setAdditionalData: (state, action: PayloadAction<{ additionalData: Record<string, any> }>) => {
      state.additionalData = action.payload.additionalData;
    },
    clearAdditionalData: (state) => {
      state.additionalData = {};
    },
    setShouldRefetch(state) {
      state.shouldRefetch = true;
    },
    resetShouldRefetch(state) {
      state.shouldRefetch = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  setShouldRefetch,
  resetShouldRefetch,
  setAdditionalData,
  clearAdditionalData,
} = modalSlice.actions;

export default modalSlice.reducer;
