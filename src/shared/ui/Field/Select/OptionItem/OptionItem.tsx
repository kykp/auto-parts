import clsx from 'clsx';

import cls from './OptionItem.module.scss';

interface OptionItemProps<Option> {
  isSelected: boolean
  option: Option
  onChange: (val: Option) => void
}

export const OptionItem = <Option extends SelectOption,>(props: OptionItemProps<Option>) => {

  const {
    // isSelected,
    option,
    onChange,
  } = props;

  const isDisabled = (option.disabled || option.isInactive);

  const handler = (cb: () => void) => {
    return isDisabled ? () => {} : () => cb();
  };

  const onChangeHandle = () => {
    onChange(option);
  };

  return (
    <div
      role={'option'}
      className={clsx(cls.OptionItem, { [cls.disabled]: isDisabled })}
      onClick={handler(onChangeHandle)}
    >
      <span>
        {option.label}
      </span>
    </div>
  );
};
