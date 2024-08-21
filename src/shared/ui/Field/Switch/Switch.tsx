import clsx from 'clsx';
import { ReactNode, useId } from 'react';

import cls from './Switch.module.scss';

export interface SwitchProps  {
  label?: string
  children?: ReactNode
  className?: string
  value?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}

export const Switch = (props: SwitchProps) => {

  const {
    label,
    className,
    value,
    onChange,
    disabled = false,
    children,
  } = props;

  const id = useId();

  return (
    <div className={className} >
      <label
        className={clsx(cls.Switch, { [cls.SwitchDisabled]: disabled })}
      >
        <input
          type='checkbox'
          checked={value}
          onChange={() => {
            onChange && onChange(!value);
          }}
          disabled={disabled}
          id={id}
        />
        <span className={cls.SwitchControl} />
        <label
          htmlFor={id}
          className={cls.Text}
        >
          {label || children}
        </label>
      </label>
    </div>
  );
};
