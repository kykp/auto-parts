import { useEffect } from 'react';
import { FieldErrors } from 'react-hook-form';

export const useScrollToError = (errors: FieldErrors) => {
  useEffect(() => {
    if (Object.values(errors).length > 0) {
      const errorNode = document.querySelector('.error');

      if (errorNode && errorNode.scrollIntoView) {
        errorNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [JSON.stringify(errors)]);
};
