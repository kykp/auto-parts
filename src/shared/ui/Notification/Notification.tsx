import React, {ReactNode} from 'react';

import {CheckinCircleIcon, LetterIcon, TriangleAttentionIcon} from '@/shared/Icon';

import cls from './Notification.module.scss';

export type NotificationIconType = 'email' | 'warning' | 'success';

const iconMap: Record<NotificationIconType, React.ReactNode> = {
  email: <LetterIcon/>,
  warning: <TriangleAttentionIcon/>,
  success: <CheckinCircleIcon/>,
};

export interface NotificationProps {
  type: NotificationIconType;
  title: string;
  text?: string;
  children?: ReactNode;
  isCustomChildren?: boolean
}

export const Notification = (props: NotificationProps) => {
  const {type, title, text, children, isCustomChildren} = props;

  return (
    <div className={cls.Notification}>
      <div>{iconMap[type]}</div>
      <div>
        <span>
          {title}
        </span>
      </div>
      <div>
        {isCustomChildren ? children : (
          <span>{text || children}</span>
        )}
      </div>
    </div>
  );
};
