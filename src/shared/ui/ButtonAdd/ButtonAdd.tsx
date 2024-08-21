import clsx from 'clsx';

import { cssColors } from '@/shared/consts/cssColors';
import { lang } from '@/shared/consts/lang';
import { PlusIcon, RefreshIcon } from '@/shared/Icon';

import cls from './ButtonAdd.module.scss';

interface ButtonAddProps {
  onClick: () => void
  className?: string
  title?: string
  isShowRefresh?: boolean
}

export const ButtonAdd = (props: ButtonAddProps) => {

  const {
    onClick,
    isShowRefresh,
    title = lang.btn.addMore,
    className,
  } = props;

  return (
    <button
      type='button'
      className={clsx(cls.Button, className || '')}
      onClick={onClick}
    >
      {isShowRefresh ? (
        <RefreshIcon
          color={cssColors.main}
          width={14}
          height={14}
          className={cls.Icon}
        />
      ) : (
        <PlusIcon
          color={cssColors.main}
          width={14}
          height={14}
          className={cls.Icon}
        />
      )}
      <span>
        {title}
      </span>
    </button>
  );
};
