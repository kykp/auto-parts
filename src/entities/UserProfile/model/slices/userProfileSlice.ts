import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserProfileSchema, User } from '@/entities/UserProfile';

const initialState: UserProfileSchema = {
  me: null,
  isAuth: false,
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.me = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.me = null;
      state.isAuth = false;
    },
  },
});

export const {
  actions: profileActions,
  reducer: profileReducer,
} = userProfileSlice;
