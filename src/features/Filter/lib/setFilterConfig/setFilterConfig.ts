import { ConfigFilter } from '../../config/types';

export const setFilterConfig = (filterData: ConfigFilter[], defaultValues?: Record<string, any>) => {
  return filterData.map(item => {
    if (item.elementType === 'date' || item.elementType === 'time') {
      const items = item.fields.map(field =>
        ({
          ...field,
          defaultValue: defaultValues
            ? defaultValues[field.name]?.replace('%3A', '-')
            : field.defaultValue,
        }));
      return { ...item, fields: items };
    }
    
    return { ...item, defaultValue: defaultValues ? defaultValues[item.name] : item.defaultValue };
  });
};
