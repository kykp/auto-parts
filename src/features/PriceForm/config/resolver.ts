import { FieldError, Resolver } from 'react-hook-form';
import { lang } from '@/shared/consts/lang';
import { FormValues } from '../types/types.ts';

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

function validateString(
  name: string,
  value: any,
  errors: Record<string, FieldError>,
  maxLength?: number
) {
  if (typeof value !== 'string') {
    return {
      ...errors,
      [name]: {
        type: 'typeError',
        message: lang.rules.incorrectSymbol,
      },
    };
  }

  if (maxLength && value.length > maxLength) {
    return {
      ...errors,
      [name]: {
        type: 'maxLength',
        message: lang.rules.maxLength,
      },
    };
  }

  return errors;
}

function validateNumber(
  name: string,
  value: any,
  errors: Record<string, FieldError>
) {
  if (isNaN(value)) {
    return {
      ...errors,
      [name]: {
        type: 'typeError',
        message: lang.rules.incorrectSymbol,
      },
    };
  }
  return errors;
}

export const resolver: Resolver<FormValues> = async (values) => {
  let errors: Record<string, FieldError> = {};

  // Validate required fields
  errors = validateRequired('article', values.article, errors);
  errors = validateRequired('name', values.name, errors);
  errors = validateRequired('company_id', values, errors);

  // Validate string fields
  errors = validateString('article', values.article, errors, 255);
  errors = validateString('name', values.name, errors, 255);
  errors = validateString('brand', values.brand, errors, 255);
  errors = validateString('delivery_time', values.delivery_time, errors, 255);
  errors = validateString('min_order_qty', values.min_order_qty, errors, 255);
  errors = validateString('quantity', values.quantity, errors, 255);
  errors = validateString('supplier', values.supplier, errors, 255);

  // Validate numeric fields
  errors = validateNumber('price', values.price, errors);
  errors = validateNumber('purchase_price', values.purchase_price, errors);

  return { values, errors };
};
