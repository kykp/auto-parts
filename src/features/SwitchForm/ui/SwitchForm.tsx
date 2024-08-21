import { ReactNode } from 'react';

import { useEaseSearchParams } from '@/shared/hooks/useEaseSearchParams';
import { Switch } from '@/shared/ui/Field/Switch';

export interface SwitchFormProps {
  value: string
  label: string | ReactNode
  name: string
  containerWidth?: number
}

export const SwitchForm = (props: SwitchFormProps) => {

  const {
    value,
    label,
    name,
  } = props;

  const [_, setParams] = useEaseSearchParams();

  const onChange = (val: boolean) => {
    setParams((p: object) => ({ ...p, [name]: val, page: 1 }));
  };

  const isOn = value === 'true';

  return <Switch onChange={onChange} value={isOn}>{label}</Switch>;
};
