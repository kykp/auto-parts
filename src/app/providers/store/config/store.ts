// redux/store.ts
import {configureStore} from '@reduxjs/toolkit';
import {UserProfileSchema, userProfileSlice} from '@/entities/UserProfile/';
import {modalReducer, ModalStateSchema} from "@/entities/Modals";

// Тип состояния всего приложения
export interface StateSchema {
  userProfile: UserProfileSchema;
  modal: ModalStateSchema;
}

// Функция для создания Redux хранилища
export function createReduxStore(initialState?: StateSchema) {
  return configureStore({
    reducer: {
      userProfile: userProfileSlice.reducer, // Используем редуктор из среза
      modal: modalReducer
    },
    preloadedState: initialState, // Начальное состояние
  });
}

// Создание хранилища
export const store = createReduxStore();

// Определение типа dispatch для использования в приложении
export type AppDispatch = typeof store.dispatch;

// Определение типа RootState для использования в селекторах
export type RootState = ReturnType<typeof store.getState>;
