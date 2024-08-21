import {CompanyProfile} from "../../api/service.ts";

export const useCompanyProfile = () => {

  const creatNewCompany = CompanyProfile.companyRegistration;

  return {
    creatNewCompany
  }
}
