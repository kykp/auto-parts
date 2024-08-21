import { useMemo } from 'react';

interface Args<ValueType> {
  options: SelectOption<ValueType>[],
  value: ValueType[],
}

export const useFilteredOptions = <ValueType,>(
  options: Args<ValueType>['options'],
  value: Args<ValueType>['value']
) => {
  return useMemo(() => {
    if (value.length === 0 || options.length === 0) return options;
    return options.filter(el => value.filter(val => val === el.value).length === 0);
  }, [options, value]);
};
