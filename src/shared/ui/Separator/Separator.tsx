import clsx from 'clsx';
import { CSSProperties } from 'react';

import cls from './Separator.module.scss';

interface SeparatorProps {
  className?: string
  style?: CSSProperties
}

export const Separator = (props: SeparatorProps) => {
  return <div className={clsx(cls.Separator, props.className)} style={props.style} />;
};
