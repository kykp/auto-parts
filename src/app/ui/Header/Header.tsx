// import { Breadcrumbs } from '@/entities/Breadcrumbs';

import { lang } from '@/shared/consts/lang';
// import { AppLink } from '@/shared/ui/AppLink';
import { Burger, BurgerProps } from '@/shared/ui/Burger/Burger';
// import { Container } from '@/shared/ui/Container';
// import { StarIcon } from '@/shared/Icon';

import cls from './Header.module.scss';

interface HeaderProps {

}

const Header = (props: HeaderProps & BurgerProps) => {

  const {
    isOpen,
    toggle,
  } = props;

  return (
    <header className={cls.Header}>
      <div className={cls.wrapper}>
        <Burger isOpen={isOpen} toggle={toggle} />
        {/*<AppLink to={'/'}>*/}
        {/*  <StarIcon />*/}
        {/*</AppLink>*/}
        <span className={cls.headerTitle}>{lang.title.headerTitle}</span>
        {/*<Breadcrumbs />*/}
        {/*<div className={cls.vSeparator} />*/}
      </div>
    </header>
  );
};

export default Header;
