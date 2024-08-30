import {UserProfileService} from "@/entities/UserProfile/api/serivce.ts";

export const useUserProfile = () => {

  const createNewUser = UserProfileService.registerNewUser;
  const logIn = UserProfileService.logIn;
  const updateToken = UserProfileService.updateToken;

  return {
    createNewUser,
    logIn,
    updateToken,
  }
}
