import {Controller} from 'react-hook-form';

import {Select} from '@/shared/ui/Field/Select';

export const SelectController = (props: any) => {
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
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Select
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
