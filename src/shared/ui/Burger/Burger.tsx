import clsx from 'clsx';

import cls from './Burger.module.scss';

export interface BurgerProps {
  isOpen: boolean
  toggle: () => void
}

export const Burger = (props: BurgerProps) => {

  const {
    isOpen,
    toggle,
  } = props;

  return (
    <button
      onClick={toggle}
      className={clsx(cls.Burger, { [cls.Opened]: isOpen })}
    >
      <span />
      <span />
      <span />
    </button>
  );
};
