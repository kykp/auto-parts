import clsx from 'clsx';
import {ComponentProps, FC, ReactNode} from 'react';

import { IconProps } from '@/shared/Icon';

import cls from './Button.module.scss';

type Themes = 'primary' | 'secondary' | 'light' | 'light-clear' | 'clear' | 'white' | 'empty-accent' | 'remove';
type Modes = 'box' | 'rounded';

type ButtonProps = ComponentProps<'button'> & {
  children?: ReactNode,
  theme?: Themes
  mode?: Modes
  Icon?: FC<IconProps>
  loading?: boolean
}

export const Button = (props: ButtonProps) => {

  const {
    type = 'button',
    disabled,
    onClick,
    children,
    theme = 'primary',
    mode,
    Icon,
    loading,
    className,
    ...otherProps
  } = props;

  const classes = [
    cls.Button,
    cls[`theme-${theme}`],
    mode && cls[`mode-${mode}`],
    className,
  ];

  return (
    <button
      aria-label={type}
      type={type}
      disabled={disabled || loading}
      className={clsx(classes)}
      onClick={onClick}
      {...otherProps}
    >
      {Icon && (
        <Icon
          width={20}
          height={20}
          className={cls.Icon}
        />
      )}{children}
    </button>
  );
};
