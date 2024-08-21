import { format } from 'date-fns';

export const getDate = (val: string | Date | null) => {
  if (val === null) return '';
  return format(new Date(val), 'dd.MM.yyyy');
};