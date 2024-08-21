import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import cls from './AppLink.module.scss';

export interface AppLinkProps extends ComponentProps<'a'> {
  className?: string
  to: string
  isNative?: boolean
  children: ReactNode
  theme?: 'default' | 'main' | 'clear'
}

export const AppLink = (props: AppLinkProps) => {

  const {
    className,
    to,
    isNative = false,
    children,
    theme = 'default',
    ref,
    ...otherProps
  } = props;

  const classes = clsx(cls.AppLink, cls[`theme-${theme}`], className);

  if (isNative) {
    return (
      <a
        className={classes}
        href={to}
        {...otherProps}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} to={to} {...otherProps}>{children}</Link>
  );
};
