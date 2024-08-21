export const defaultValues: FormValues = {
  companyName: '',
  email: '',
  passwordFirst: '',
  passwordSecond: '',
};

export interface FormValues {
  companyName: string;
  email: string;
  passwordFirst: string;
  passwordSecond: string;
}
