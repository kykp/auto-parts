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
    login: (state, action: PayloadAction<UserProfileSchema>) => {
      state.me = action.payload.me;
      state.isAuth = action.payload.isAuth;
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
