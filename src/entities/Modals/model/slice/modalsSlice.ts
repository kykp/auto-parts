import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ModalIdsType } from '@/entities/Modals';

import type { IModal } from '../types/modal';
import type { ModalSchema } from '../types/modalSchema';

const initialState: ModalSchema = [];

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    addModal: (state, action: PayloadAction<IModal<ModalIdsType>>) => {
      state.push(action.payload);
    },
    removeModal: (state) => {
      state.pop();
    },
  },
});

export const {
  actions: modalsAction,
  reducer: modalsReducer,
} = modalsSlice;
