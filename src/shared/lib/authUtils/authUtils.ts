import {storeTokens} from "@/entities/UserProfile/lib/storeTokens.ts";
import {AxiosResponse} from "axios";
import {UserLoginResponse} from "@/entities/UserProfile/api/serivce.ts";

interface LoginAuthProps {
  response: AxiosResponse<UserLoginResponse>;
}

export const authUtils = (props: LoginAuthProps) => {
  const {response} = props;

  if (!response || !response.data) {
    console.log('Authorization failed: No response data');
    return null;
  }

  const {accessToken, refreshToken, email, id} = response.data;

  if (!accessToken || !refreshToken || !email || !id) {
    console.log('Authorization failed: Incomplete data');
    return null;
  }

  storeTokens(accessToken, refreshToken);

  return {accessToken, refreshToken, email, id}
}
