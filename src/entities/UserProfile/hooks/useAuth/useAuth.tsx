import {destroyCookie} from 'nookies';
import {useAppDispatch} from "@/shared/hooks/useAppDispatch";
import {profileActions} from "@/entities/UserProfile/model/slices/userProfileSlice.ts";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const logOut = () => {
    destroyCookie(null, 'accessToken');
    destroyCookie(null, 'refreshToken');
    dispatch(profileActions.logout());
  };
  return {logOut};
};
