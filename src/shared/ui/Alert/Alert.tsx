import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import { cssColors } from '@/shared/consts/cssColors';
import { CheckIcon, IconProps, NotificationIcon } from '@/shared/Icon';

import cls from './Alert.module.scss';

const icons: Record<NotificationType, FC<IconProps>> = {
  successful: CheckIcon,
  error: NotificationIcon,
};

type NotificationType = 'successful' | 'error';

interface NotificationProps {
  children: ReactNode
  type: NotificationType
}

export const Alert = (props: NotificationProps) => {

  const {
    children,
    type,
  } = props;

  const Icon = icons[type];

  return (
    <div className={clsx(cls.Alert, [cls[`type-${type}`]])}>
      <div className={cls.Icon}>
        <Icon
          width={20}
          height={20}
          color={type === 'successful' ? cssColors.successful : cssColors.error}
        />
      </div>
      <span
      >
        {children}
      </span>
    </div>
  );
};
