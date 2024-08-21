import { ReactNode, useId } from 'react';

import { cssColors } from '@/shared/consts/cssColors';
import { CheckIcon } from '@/shared/Icon';
import cls from './Checkbox.module.scss';

export interface CheckboxProps {
  children?: ReactNode
  className?: string
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
  error?: string
}

export const Checkbox = (props: CheckboxProps) => {

  const {
    children,
    className,
    label,
    value,
    onChange,
    disabled,
  } = props;

  const id = useId();

  return (
    <div className={className}>
      <label className={cls.Checkbox}>
        <input
          type='checkbox'
          checked={value}
          onChange={() => {
            onChange && onChange(!value);
          }}
          disabled={disabled}
          id={id}
        />
        <label htmlFor={id} className={cls.CheckboxControl}>
          <CheckIcon
            color={cssColors.white}
            width={16}
            height={16}
          />
        </label>
        {(label || children) && (
          <label
            className={cls.CheckboxText}
            htmlFor={id}
          >
            {label || children}
          </label>
        )}
      </label>
    </div>
  );
};
