import $api from "@/shared/api/axiosinstance.ts";
import {CompanyProfileSchema} from "@/entities/CompanyProfile/model/types.ts";
import {UserRegistrationSchema} from "@/entities/UserProfile/model/types/UserProfileSchema.ts";

export class CompanyProfile {
  static companyRegistration = (data: CompanyProfileSchema & UserRegistrationSchema) => {
    return $api.post('/auth/create-company', data)
  }
}
