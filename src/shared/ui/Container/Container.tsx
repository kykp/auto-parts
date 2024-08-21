import clsx from 'clsx';
import {ReactNode} from 'react';

import cls from './Container.module.scss';

/**
 * Размеры
 * xs -
 * m - 990
 * l - 1440
 */
type UnionSize = 'xs' | 'm' | 'l';

interface ContainerProps {
  children: ReactNode
  size?: UnionSize
  className?: string
}

export const Container = (props: ContainerProps) => {
  const {className, size, children} = props;

  const baseClass = cls.Container;

  const sizeClass = size ? cls[`size-${size}`] : '';

  const combinedClassName = clsx(baseClass, sizeClass, className || '');

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};
