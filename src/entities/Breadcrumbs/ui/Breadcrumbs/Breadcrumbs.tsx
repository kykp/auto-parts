import clsx from 'clsx';

import { AppLink } from '@/shared/ui/AppLink';
import { ArrowFlatRightIcon, HomeIcon } from '@/shared/Icon';

import { useBreadcrumb } from '../../hook/useBreadcrumb/useBreadcrumb';
import { getListByPath } from '../../lib/getListByPath/getListByPath';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';

import cls from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {

  const { path } = useBreadcrumb();
  const list = getListByPath(path);

  return (
    <div >
      <AppLink to='/' className={cls.link}>
        <HomeIcon className={cls.icon} />
      </AppLink>
      <div className={clsx(cls.link, cls.arrow)}>
        {list.length > 0 && <ArrowFlatRightIcon />}
      </div>
      {list.map((item, index: number) => (
        <Breadcrumb
          key={item.name}
          item={item}
          isNotLast={index + 1 !== list.length}
        />
      ))}
    </div>
  );
};
