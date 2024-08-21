import {UserRegistrationSchema} from "../model/types/UserProfileSchema.ts";
import $api from "@/shared/api/axiosinstance.ts";

export class UserProfileService {
  static registerNewUser = (data: UserRegistrationSchema) => {
    return $api.post('/auth/register', data);
  }

  static logIn = (data: UserRegistrationSchema) => {
    return $api.post('/auth/login', data);
  }

  static checkUser = () => {
    return $api.post('/auth/check-user');
  }
}
