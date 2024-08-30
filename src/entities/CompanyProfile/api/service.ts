import $api from "@/shared/api/axiosinstance.ts";
import {CompanyProfileSchema} from "@/entities/CompanyProfile/model/types.ts";
import {UserRegistrationSchema} from "@/entities/UserProfile/model/types/UserProfileSchema.ts";
import {AxiosResponse} from "axios";
import {UserLoginResponse} from "@/entities/UserProfile/api/serivce.ts";

export class CompanyProfile {
  static companyRegistration = (data: CompanyProfileSchema & UserRegistrationSchema)
    : Promise<AxiosResponse<UserLoginResponse>> => {
    return $api.post('/auth/create-company', data)
  }
}
