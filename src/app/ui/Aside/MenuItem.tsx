import { useState } from 'react';

import { RouteSchema } from '@/app/providers/router';

import { cssColors } from '@/shared/consts/cssColors';
import { AppLink } from '@/shared/ui/AppLink';
import { MinusIcon, PlusIcon } from '@/shared/Icon';

import cls from './Aside.module.scss';

interface MenuItemProps extends Pick<RouteSchema, 'path' | 'name' | 'Icon' | 'defaultParams'> {
  items?: Pick<RouteSchema, 'path' | 'name' | 'Icon' | 'defaultParams'>[]
}

export const MenuItem = (props: MenuItemProps) => {

  const {
    path,
    name,
    Icon,
    items,
    defaultParams,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(isOpen => !isOpen);

  return (
    <li>
      {Array.isArray(items) && items.length > 0 ? (
        <>
          <div
            onClick={toggle}
            className={cls.Link}
          >
            <div className={cls.IconLeft}>
              {Icon}
            </div>
            <span>{name}</span>
            <div className={cls.IconRight}>
              <PlusIcon color={cssColors.text4} width={16} height={16} />
              {isOpen ? (
                <MinusIcon color={cssColors.text4} width={16} height={16} />
              ) : (
                <PlusIcon color={cssColors.text4} width={16} height={16} />
              )}
            </div>
          </div>
          {isOpen && (
            <ul className={cls.submenu}>
              {items.map(el => (
                <li key={el.path}>
                  <AppLink
                    to={el.path!}
                    className={cls.childLink}
                    theme={'clear'}
                  >
                    <span>{el.name}</span>
                  </AppLink>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <AppLink
          to={path! + (defaultParams ? defaultParams : '')}
          className={cls.Link}
          theme={'clear'}
        >
          <div className={cls.IconLeft}>
            {Icon}
          </div>
          <span>{name}</span>
        </AppLink>
      )}
    </li>
  );
};
