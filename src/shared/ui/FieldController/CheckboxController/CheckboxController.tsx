import { Controller } from 'react-hook-form';

import { Checkbox, CheckboxProps } from '@/shared/ui/Field/Checkbox';

import { ControlledProps, Rules } from '../types';

export const CheckboxController = <FormValues extends object, >(
  props: ControlledProps<FormValues> & CheckboxProps & Rules
) => {
  const {
    control,
    name,
    ...rest
  } = props;

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Checkbox
          {...rest}
          error={error?.message}
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
