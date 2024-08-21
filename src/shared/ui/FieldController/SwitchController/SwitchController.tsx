import { Controller } from 'react-hook-form';

import { Switch, SwitchProps } from '@/shared/ui/Field/Switch';

import { ControlledProps, Rules } from '../types';

export const SwitchController = <FormValues extends object, >(
  props: ControlledProps<FormValues> & SwitchProps & Rules
) => {
  const {
    control,
    name,
    ...rest
  } = props;

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <Switch
          {...rest}
          onChange={(val) => {
            onChange(val);
            rest.onChange && rest.onChange(val);
          }}
          value={value}
        />
      )}
      name={name}
    />
  );
};
