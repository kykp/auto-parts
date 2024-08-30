import {User, UserRegistrationSchema} from "../model/types/UserProfileSchema.ts";
import $api from "@/shared/api/axiosinstance.ts";
import {AxiosResponse} from "axios";

interface UpdateTokenResponse {
  message: string;
  token:  {
    createdAt: Date;
    token: string;
    updatedAt: Date;
    userId: number;
    email: string;
  };
}

export interface UserLoginResponse extends Omit<User, 'name'> {
  accessToken: string
  refreshToken: string;
}

interface UserVerifyResponse {
  message: string
  accessToken: string;
  id: number;
  email: string;
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

  static verifyAccessToken = (): Promise<AxiosResponse<UserVerifyResponse>> => {
    return $api.post('/auth/verify-user')
  }
}
