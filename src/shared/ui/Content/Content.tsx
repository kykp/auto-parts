import clsx from 'clsx';
import {ReactNode} from 'react';

import cls from './Content.module.scss';

interface ContentProps {
  children: ReactNode
  className?: string
  filledHeight?: boolean
}

export const Content = (props: ContentProps) => {

  const {
    children,
    className,
    filledHeight,
  } = props;

  const baseClass = cls.Content;

  const filledClass = filledHeight ? cls.filled : '';

  const combinedClasses = clsx(baseClass, filledClass, className || '')

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};
