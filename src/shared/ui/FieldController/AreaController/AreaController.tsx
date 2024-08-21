import { Controller } from 'react-hook-form';

import { Area } from '../../Field/Area';

export const AreaController = (props: any) => {
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
        <Area
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
