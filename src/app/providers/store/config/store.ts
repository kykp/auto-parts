// redux/store.ts
import {configureStore} from '@reduxjs/toolkit';
import {userProfileSlice} from '@/entities/UserProfile/';

// Тип состояния всего приложения
export interface StateSchema {
  userProfile: ReturnType<typeof userProfileSlice.reducer>;
}

// Функция для создания Redux хранилища
export function createReduxStore(initialState?: StateSchema) {
  return configureStore({
    reducer: {
      userProfile: userProfileSlice.reducer, // Используем редуктор из среза
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
