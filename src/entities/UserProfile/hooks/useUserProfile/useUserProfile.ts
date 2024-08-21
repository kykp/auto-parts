import {UserProfileService} from "@/entities/UserProfile/api/serivce.ts";

export const useUserProfile = () => {

  const createNewUser = UserProfileService.registerNewUser;
  const logIn = UserProfileService.logIn;

  return {
    createNewUser,
    logIn
  }
}
