import clsx from 'clsx';

import { CloseIcon } from '@/shared/Icon';

import cls from './XBtn.module.scss';

interface XBtnProps {
  className?: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  theme?: 'main' | 'filled'
  style?: React.CSSProperties
}

export const XBtn = (props: XBtnProps) => {

  const {
    className,
    onClick,
    theme = 'main',
    style,
  } = props;

  return (
    <button
      style={style}
      type={'button'}
      onClick={onClick}
      className={clsx(cls.x, { [cls[`theme-${theme}`]]: theme }, className)}
    >
      <CloseIcon width={20} height={20} />
    </button>
  );
};
