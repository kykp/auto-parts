import { Controller } from 'react-hook-form';

import { Input } from '@/shared/ui/Field/Input';

export const InputController = (props: any) => {
  const {
    control,
    name,
    rules,
    ...rest
  } = props;

  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          {...rest}
          error={error?.message}
          onChange={(val) => {
            onChange(val);
            rest.onChange && rest.onChange(val);
          }}
          value={value}
          name={name}
        />
      )}
      name={name}
    />
  );
};
