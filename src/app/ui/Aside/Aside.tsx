import clsx from 'clsx';

import { appRoutes } from '@/app/providers/router';
import { MenuItem } from '@/app/ui/Aside/MenuItem';

import { ExitIcon } from '@/shared/Icon';

import cls from './Aside.module.scss';

interface AsideProps {
  isOpen: boolean
  logout: () => void
}

export const Aside = (props: AsideProps) => {

  const {
    isOpen,
    logout,
  } = props;

  return (
    <aside
      className={clsx(cls.Aside, { [cls.opened]: isOpen })}
    >
      <nav>
        <ul>
          {appRoutes.map(({ Icon, ...el }, i) => (
            <MenuItem key={`${i}-${el.path}-${el.name}`} Icon={Icon} {...el} />
          ))}
        </ul>
      </nav>
      <button
        className={cls.logout}
        onClick={logout}
      >
        <div className={cls.IconLeft}>
          <ExitIcon width={20} height={20} />
        </div>
        <span>Выход</span>
      </button>
    </aside>
  );
};
