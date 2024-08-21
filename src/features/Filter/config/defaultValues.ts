import { ConfigFilter } from '../config/types';

interface DefaultValues {
  //TODO добавить нормальные значения
  [key: string]: any;
}

export const createDefaultValues = (config: ConfigFilter[]): DefaultValues => {
  return config.reduce((acc: DefaultValues, el) => {

    if (el.elementType === 'date') {
      el.fields.forEach(field => (acc[field.name] = field.defaultValue));
      return acc;
    }

    if (el.elementType === 'time') {
      el.fields.forEach(field => (acc[field.name] = field.defaultValue
        ? field.defaultValue?.replace('-', ':')
        : null));
      return acc;
    }

    const value = el.defaultValue;

    if (el.elementType === 'select') {
      const options = el.options.find(el => el.value === value);
      acc[el.name] = value ? options : null;
      return acc;
    }

    if (el.elementType === 'checkBox' || el.elementType === 'switcher') {
      acc[el.name] = !!value;
      return acc;
    }

    acc[el.name] = value ? value : '';
    return acc;
  },{});
};
