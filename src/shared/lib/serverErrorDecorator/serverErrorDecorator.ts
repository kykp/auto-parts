import { lang } from '@/shared/consts/lang';

export const serverErrorDecorator = (value: string | string[]): string | undefined => {
  if (Array.isArray(value)) {
    if (value.length > 0) {
      switch (value[0]) {
      case 'The slug has already been taken.':
        return lang.rules.unique;
      default:
        return value[0];
      }
    }
    return undefined;
  } else {
    switch (value) {
    case 'The slug has already been taken.':
      return lang.rules.unique;
    default:
      return value;
    }
  }
};
