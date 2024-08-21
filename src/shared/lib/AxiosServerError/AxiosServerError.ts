import axios, { AxiosError } from 'axios';
import { UseFormSetError, FieldValues } from 'react-hook-form';

export const AxiosServerError = <FormValues extends FieldValues>(
  e: unknown,
  setError: UseFormSetError<FormValues>
) => {
  if (axios.isAxiosError(e)) {
    const error = e as AxiosError<{ errors: { [key in keyof FormValues]: string } }>;

    if (error.response?.data.errors) {
      Object.entries(error.response.data.errors).forEach(([key, value]) => {
        setError(key as any, {
          type: 'server',
          message: value,
        });
      });
    }
  }
};
