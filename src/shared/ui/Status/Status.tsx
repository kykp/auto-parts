import clsx from 'clsx';

import cls from './Status.module.scss';


type Themes = 'read' | 'notread';

type StatusProps = {
  theme?: Themes
  title: string
}

export const Status = (props: StatusProps) => {

  const {
    theme = 'read',
    title,
  } = props;

  const statusTitle = title === 'new' ? 'Новый' : 'Прочитан';

  const classes = [
    cls[`theme-${theme}`],
    cls.Status,
  ];

  return <div className={clsx(classes)}>{statusTitle}</div>;
};
