import {User, UserRegistrationSchema} from "../model/types/UserProfileSchema.ts";
import $api from "@/shared/api/axiosinstance.ts";
import {AxiosResponse} from "axios";

interface UpdateTokenResponse {
  message: string;
  token: string;
}

export interface UserLoginResponse extends Omit<User, 'name'>{
  accessToken: string
  refreshToken: string;
}

export class UserProfileService {
  static registerNewUser = (data: UserRegistrationSchema) => {
    return $api.post('/auth/register', data);
  }

  static logIn = (data: UserRegistrationSchema): Promise<AxiosResponse<UserLoginResponse>> => {
    return $api.post('/auth/login', data);
  }

  static updateToken = (token: string): Promise<AxiosResponse<UpdateTokenResponse>> => {
    return $api.post('/auth/update-token', {token});
  }
}
