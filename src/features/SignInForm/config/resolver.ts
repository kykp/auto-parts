import { FieldError, Resolver } from 'react-hook-form';

import { lang } from '@/shared/consts/lang';

import { FormValues } from './form';

function validateRequired(
  name: string,
  value: any,
  errors: Record<string, FieldError>
) {

  if (!value) {
    return {
      ...errors,
      [name]: {
        type: 'required',
        message: lang.rules.required,
      },
    };
  }

  return errors;
}

export const resolver: Resolver<FormValues> = async (values) => {
  let errors: Record<string, FieldError> = {};

  errors = Object.entries(values).reduce(
    (acc, [name, value]) => validateRequired(name, value, acc),
    {}
  );

  return { values, errors };
};
