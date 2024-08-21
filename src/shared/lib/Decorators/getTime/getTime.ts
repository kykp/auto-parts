import { format } from 'date-fns';

export const getTime = (val: string | Date | null) => {
  if (val === null) return '';
  return format(new Date(val), 'HH:mm');
};

