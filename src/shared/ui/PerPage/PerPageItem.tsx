import clsx from 'clsx';

import { Button } from '@/shared/ui/Button';

import cls from './PerPageItem.module.scss';

interface PerPageItemProps {
  num: number
  isActive: boolean
  setPerPage: (perPage: number) => void
}

export const PerPageItem = (props: PerPageItemProps) => {

  const {
    num,
    isActive,
    setPerPage,
  } = props;

  const handler = () => {
    setPerPage(num);
  };

  return (
    <Button
      theme={'empty-accent'}
      onClick={handler}
      className={clsx(cls.Button, { [cls.notActive]: !isActive })}
    >
      {num}
    </Button>
  );
};
