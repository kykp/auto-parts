import { ReactNode, useState } from 'react';

import { Aside } from '@/app/ui/Aside/Aside';

import Header from '../Header/Header';

import cls from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode
  logout: () => void
}

const Layout = (props: LayoutProps) => {

  const [isOpenAside, setIsOpenAside] = useState(false);

  const toggle = () => setIsOpenAside(isOpenAside => !isOpenAside);

  return (
    <div className={cls.Layout}>
      <Header
        isOpen={isOpenAside}
        toggle={toggle}
      />
      <Aside isOpen={isOpenAside} logout={props.logout} />
      <div
        style={{
          transition: 'all .25s',
          paddingLeft: isOpenAside ? 'var(--sidebar-width--open)' : 'var(--sidebar-width)',
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
