import { DefaultValues } from '../../config/types';

export const checkEmptyValues = (data: DefaultValues) => {
  return Object.entries(data).reduce((acc:Record<string, any>, [key, value]) => {
    acc[key] = value ? value : null;
    return acc;
  }, {});

};