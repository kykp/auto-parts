import { useEffect, useMemo } from 'react';

import { ConfigFilter } from '@/features/Filter';
import { ParamsOption } from '@/features/SelectedFilterOptions/config/types';


import { useShouldUpdate } from '@/shared/providers/ShouldUpdateProvider';

import { Option } from '../Option/Option';

import cls from './SelectedFilterOptions.module.scss';

interface SelectedFilterOptionsProps {
  filterConfig?: ConfigFilter[];
}

export const SelectedFilterOptions = (props: SelectedFilterOptionsProps) => {
  const { filterConfig } = props;

  const shouldUpdate = useShouldUpdate();

  const data: ParamsOption[] = useMemo(() => {

    const processedData = filterConfig?.flatMap(filterField => {

      if (filterField.elementType === 'date' || filterField.elementType === 'time') {
        return filterField.fields.map(el => {
          if (!el.defaultValue) {
            return null;
          }
          return {
            name: `${filterField.label} ${el.label}`,
            text: filterField.elementType === 'time' ? el.defaultValue?.replace('-',':') : el.defaultValue,
            paramsName: el.name,
          };
        });
      }

      if (!filterField.defaultValue) {
        return null;
      }

      if (filterField.elementType === 'select') {
        const value = filterField.options.find(el => el.value === filterField.defaultValue);
        return { name: filterField.label, text: value?.label, paramsName: filterField.name };
      }

      if (filterField.elementType === 'checkBox' || filterField.elementType === 'switcher') {
        if (!filterField.defaultValue) {
          return null;
        }
        return {
          name: filterField.label,
          text: filterField.defaultValue ? 'Да' : 'Нет',
          paramsName: filterField.name,
        };
      }

      return { name: filterField.label, text: filterField.defaultValue, paramsName: filterField.name };
    }).filter(Boolean);

    return processedData as ParamsOption[];
  }, [filterConfig]);

  useEffect(() => {
    if (shouldUpdate) {
      shouldUpdate.setIsUpdate(true);
    }
  }, [data]);

  return (
    <div className={cls.SelectedFilterOptions}>
      {data?.map((option: ParamsOption, index) => (
        <Option key={index} option={option} />
      ))}
    </div>
  );
};
